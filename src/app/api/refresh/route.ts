import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { buildTfIdf, cosine } from "@/lib/cluster/tfidf";
import { scoreArticle } from "@/lib/scoring";
import { buildFallbackCard } from "@/lib/cards/fallback";
import { buildRuntimeUserPrompt, EvidenceItem } from "@/lib/prompts/runtimePrompt";
import { generateCardWithLLM } from "@/lib/llm/provider";
import { fetchCryptoPanicLinks } from "@/lib/sources/cryptopanic";
import {
  fetchGdeltArticles,
  parseGdeltSeenDateUtc,
  canonicalizeUrl,
  normalizeGdeltQuery,
} from "@/lib/sources/gdelt";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------- utils ----------
function nowUtcIso() {
  return new Date().toISOString();
}

type FetchStatus = "ok" | "forbidden" | "timeout" | "no_content" | "error";

const FETCH_TIMEOUT_MS = 8000;

function stripHtmlToText(html: string): string {
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ");

  text = text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();

  return text;
}

async function fetchArticleText(url: string): Promise<{
  status: FetchStatus;
  error?: string;
  text?: string;
}> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: controller.signal,
    });
    if (res.status === 403) return { status: "forbidden", error: "HTTP 403" };
    if (!res.ok) {
      return {
        status: "error",
        error: `HTTP ${res.status} ${res.statusText}`,
      };
    }
    const html = await res.text();
    const text = stripHtmlToText(html);
    if (!text || text.length < 200) {
      return { status: "no_content", error: "正文为空/过短" };
    }
    return { status: "ok", text };
  } catch (e: any) {
    if (String(e?.name || "").toLowerCase().includes("abort")) {
      return { status: "timeout", error: "超时" };
    }
    return { status: "error", error: String(e?.message || e) };
  } finally {
    clearTimeout(id);
  }
}

function extractEvidencePoints(text: string, max = 3): string[] {
  const parts = text
    .split(/[。！？?!?]\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 8);
  const picked: string[] = [];
  for (const p of parts) {
    const short = p.slice(0, 60);
    if (!picked.includes(short)) picked.push(short);
    if (picked.length >= max) break;
  }
  return picked;
}

function safeParseJson<T>(s: string, fallback: T): T {
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

function isAuthorized(req: NextRequest) {
  if (req.headers.get("x-vercel-cron") === "1") return true;
  const expected = [process.env.REFRESH_SECRET, process.env.CRON_SECRET]
    .map((v) => String(v || "").trim())
    .filter(Boolean);
  if (expected.length === 0) return false;

  const url = new URL(req.url);
  const qSecret = url.searchParams.get("secret") || "";

  const headerSecret =
    req.headers.get("x-refresh-secret") ||
    req.headers.get("x-cron-secret") ||
    "";

  const auth = req.headers.get("authorization") || "";
  const bearer = auth.toLowerCase().startsWith("bearer ")
    ? auth.slice(7).trim()
    : "";

  const provided = qSecret || headerSecret || bearer;
  return expected.includes(provided);
}

const PUBLIC_REFRESH = (process.env.PUBLIC_REFRESH || "").trim() === "1";
const PUBLIC_REFRESH_COOLDOWN_SECONDS = Number(
  process.env.PUBLIC_REFRESH_COOLDOWN_SECONDS || "5"
);
const PUBLIC_REFRESH_COOLDOWN_MINUTES = Number(
  process.env.PUBLIC_REFRESH_COOLDOWN_MINUTES || "0"
);

const SIM_RELATED_THRESHOLD = Number(
  process.env.SIM_RELATED_THRESHOLD || "0.15"
);
const SIM_DUPLICATE_THRESHOLD = Number(
  process.env.SIM_DUPLICATE_THRESHOLD || "0.78"
);

function clamp01(value: number, fallback: number) {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(0, Math.min(1, value));
}

const RELATED_THRESHOLD = clamp01(SIM_RELATED_THRESHOLD, 0.15);
const DUPLICATE_THRESHOLD = clamp01(SIM_DUPLICATE_THRESHOLD, 0.78);

async function canPublicRefresh() {
  if (!PUBLIC_REFRESH) return { ok: false, reason: "Public refresh disabled." };
  const latest = await prisma.batch.findFirst({
    orderBy: { createdAtUtc: "desc" },
  });
  if (!latest) return { ok: true };
  if (latest.status === "running") {
    return { ok: false, reason: "Refresh already running. Please wait." };
  }
  const diffMs = Date.now() - latest.createdAtUtc.getTime();
  const cooldownSeconds =
    Number.isFinite(PUBLIC_REFRESH_COOLDOWN_SECONDS) &&
    PUBLIC_REFRESH_COOLDOWN_SECONDS > 0
      ? PUBLIC_REFRESH_COOLDOWN_SECONDS
      : Math.max(0, PUBLIC_REFRESH_COOLDOWN_MINUTES) * 60;
  const minMs = cooldownSeconds * 1000;
  if (diffMs < minMs) {
    const waitSec = Math.ceil((minMs - diffMs) / 1000);
    return {
      ok: false,
      reason: `Please wait ${waitSec}s before refreshing again.`,
    };
  }
  return { ok: true };
}

// ---------- europe filter ----------
const EURO_COUNTRIES = new Set([
  "AL", "AD", "AT", "BE", "BG", "BA", "BY", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GR", "HR", "HU", "IE", "IS", "IT",
  "LI", "LT", "LU", "LV", "MC", "MD", "ME", "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS", "SE", "SI", "SK", "SM", "UA", "VA",
]);

const EURO_TLDS = new Set([
  "de", "fr", "it", "es", "nl", "be", "se", "no", "dk", "fi", "ie", "pt", "pl", "cz", "sk", "hu", "ro", "bg", "gr", "at", "ch", "uk",
]);

const EURO_DOMAIN_ALLOWLIST = new Set(
  (process.env.EURO_DOMAIN_ALLOWLIST || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
);

const EXCLUDE_DOMAINS = new Set(
  (process.env.EXCLUDE_DOMAINS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
);

function isEuropeArticle(a: any): boolean {
  const sc = String(a?.sourceCountry || a?.sourcecountry || "").toUpperCase();
  if (sc && EURO_COUNTRIES.has(sc)) return true;

  const domain = String(a?.domain || "").toLowerCase();
  if (domain && EURO_DOMAIN_ALLOWLIST.has(domain)) return true;
  const tld = domain.split(".").pop() || "";
  if (tld && EURO_TLDS.has(tld)) return true;

  return false;
}

function guessRegion(a: any): string | undefined {
  const sc = String(a?.sourceCountry || a?.sourcecountry || "").toUpperCase();
  if (sc) return sc;
  const domain = String(a?.domain || "").toLowerCase();
  const tld = domain.split(".").pop() || "";
  if (tld) return tld.toUpperCase();
  return undefined;
}

function toEvidenceItem(a: any): EvidenceItem | null {
  if (!a?.url) return null;
  return {
    url: String(a.url),
    title: String(a?.title || ""),
    excerpt: a?.excerpt ? String(a.excerpt).slice(0, 500) : undefined,
    source_name: String(a?.domain || "unknown"),
    published_time_utc:
      parseGdeltSeenDateUtc(a?.seendate)?.toISOString() || nowUtcIso(),
  };
}

function buildEvidencePack(items: any[]): EvidenceItem[] {
  return items.map(toEvidenceItem).filter(Boolean) as EvidenceItem[];
}

function buildEvidenceForArticle(primary: any, related: any[]): EvidenceItem[] {
  const evidence: EvidenceItem[] = [];
  const usedDomain = new Set<string>();

  const primaryItem = toEvidenceItem(primary);
  if (primaryItem) {
    evidence.push(primaryItem);
    const domain = String(primary?.domain || "").toLowerCase();
    if (domain) usedDomain.add(domain);
  }

  for (const a of related) {
    const domain = String(a?.domain || "").toLowerCase();
    const item = toEvidenceItem(a);
    if (!item) continue;
    if (domain && usedDomain.has(domain)) continue;
    usedDomain.add(domain);
    evidence.push(item);
    if (evidence.length >= 3) break;
  }

  if (evidence.length < 3) {
    for (const a of [primary, ...related]) {
      const item = toEvidenceItem(a);
      if (!item) continue;
      evidence.push(item);
      if (evidence.length >= 3) break;
    }
  }

  if (evidence.length === 0) return [];
  while (evidence.length < 3) evidence.push(evidence[evidence.length - 1]);
  return evidence.slice(0, 3);
}

function normalizeTitle(raw: string): string {
  return String(raw || "")
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function dedupeByTitle(items: any[]): any[] {
  const buckets = new Map<string, any>();
  for (const a of items) {
    const key = normalizeTitle(a?.title || "");
    if (!key) {
      buckets.set(String(a?._urlCanonical || a?.url || Math.random()), a);
      continue;
    }
    const prev = buckets.get(key);
    if (!prev) {
      buckets.set(key, a);
      continue;
    }
    const tPrev = parseGdeltSeenDateUtc(prev?.seendate)?.getTime() || 0;
    const tCur = parseGdeltSeenDateUtc(a?.seendate)?.getTime() || 0;
    if (tCur >= tPrev) buckets.set(key, a);
  }
  return Array.from(buckets.values());
}

function extractKeyTokensFromTitle(title: string): string[] {
  const tokens = new Set<string>();
  const nums = title.match(/\d+([.,]\d+)?%?/g) || [];
  nums.forEach((n) => tokens.add(n));
  const acronyms = title.match(/\b[A-Z]{2,}\b/g) || [];
  acronyms.forEach((w) => tokens.add(w));
  return [...tokens].slice(0, 6);
}

function inferImpactAxis(text: string): "注册" | "入金" | "交易" {
  const t = text.toLowerCase();
  const score = {
    注册: /(mica|esma|eba|fca|bafin|amf|kyc|aml|license|compliance|regulat|policy|law|ban|restriction|approval|enforcement)/.test(
      t
    )
      ? 1
      : 0,
    入金: /(deposit|withdraw|on-?ramp|off-?ramp|sepa|iban|swift|bank|card|fiat|payment|stablecoin|usdt|usdc|e-?money)/.test(
      t
    )
      ? 1
      : 0,
    交易: /(exchange|listing|delist|pair|spot|margin|leverage|derivative|perpetual|futures|orderbook|trading|market)/.test(
      t
    )
      ? 1
      : 0,
  } as const;

  const entries = Object.entries(score) as Array<
    ["注册" | "入金" | "交易", number]
  >;
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0]?.[1] ? entries[0][0] : "入金";
}

// ---------- main ----------
export async function GET(req: NextRequest) {
  const batchId =
    (globalThis.crypto?.randomUUID?.() as string | undefined) ??
    `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  if (!isAuthorized(req)) {
    const pub = await canPublicRefresh();
    if (!pub.ok) {
      return NextResponse.json(
        { ok: false, error: pub.reason, batchId },
        { status: 429 }
      );
    }
  }

  const end = new Date();
  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);

  const defaultQuery =
    "crypto OR bitcoin OR ethereum OR stablecoin OR exchange OR MiCA OR AML OR ETF";
  const rawQuery = normalizeGdeltQuery(process.env.GDELT_QUERY || defaultQuery);

  let batchCreated = false;
  const cryptoPromise = fetchCryptoPanicLinks();

  try {
    await prisma.batch.create({
      data: {
        id: batchId,
        windowStartUtc: start,
        windowEndUtc: end,
        status: "running",
        error: null,
        gdeltQuery: rawQuery,
        gdeltUrl: "",
        articleCount: 0,
        europeArticleCount: 0,
        supplementLinksText: null,
      },
    });
    batchCreated = true;

    const gdelt = await fetchGdeltArticles({
      rawQuery,
      start,
      end,
      maxrecords: 250,
      sort: "HybridRel",
    });

    if (batchCreated) {
      await prisma.batch.update({
        where: { id: batchId },
        data: { gdeltUrl: gdelt.gdeltUrl, gdeltQuery: gdelt.rawQuery },
      });
    }

    const articlesRaw: any[] = gdelt.articles || [];

    // 去重
    const seen = new Set<string>();
    const deduped: any[] = [];
    for (const a of articlesRaw) {
      const url = a?.url;
      if (!url) continue;
      const domain = String(a?.domain || "").toLowerCase();
      if (domain && EXCLUDE_DOMAINS.has(domain)) continue;
      const cu = canonicalizeUrl(url);
      if (!cu) continue;
      if (seen.has(cu)) continue;
      seen.add(cu);
      deduped.push({ ...a, _urlCanonical: cu });
    }

    const europe = deduped.filter(isEuropeArticle);
    const europeUnique = dedupeByTitle(europe);
    const nonEurope = deduped.filter((a) => !isEuropeArticle(a));
    const nonEuropeUnique = dedupeByTitle(nonEurope);
    const picked = [...europeUnique, ...nonEuropeUnique];

    const crypto = await cryptoPromise;
    const supplementLinksText =
      crypto.items.length > 0 || crypto.note
        ? JSON.stringify(crypto)
        : null;

    // 没文章：记录成功 batch，但不生成卡片
    if (picked.length === 0) {
      if (batchCreated) {
        await prisma.batch.update({
          where: { id: batchId },
          data: {
            status: "success",
            error: null,
            articleCount: deduped.length,
            europeArticleCount: europeUnique.length,
            supplementLinksText,
          },
        });
      }

      return NextResponse.json({
        ok: true,
        batchId,
        nowUtc: nowUtcIso(),
        windowUtc: { startdatetime: gdelt.startdatetime, enddatetime: gdelt.enddatetime },
        counts: {
          fetched: articlesRaw.length,
          deduped: deduped.length,
          europe: europeUnique.length,
          usedForRanking: 0,
        },
        top5: [],
        supplement_links: crypto.items || [],
        note: "本次窗口欧洲本地媒体不足：已记录成功 batch，但未生成卡片。",
      });
    }

    // 入库 articles
    const toCreateArticles = picked.map((a) => {
      const seenDateUtc = parseGdeltSeenDateUtc(a?.seendate);
      return {
        batchId,
        url: a.url,
        urlCanonical: a._urlCanonical,
        title: String(a.title || "").slice(0, 400),
        excerpt: a?.excerpt ? String(a.excerpt).slice(0, 800) : null,
        domain: a?.domain ? String(a.domain).slice(0, 200) : null,
        sourceCountry: a?.sourceCountry
          ? String(a.sourceCountry).slice(0, 10)
          : a?.sourcecountry
          ? String(a.sourcecountry).slice(0, 10)
          : null,
        language: a?.language ? String(a.language).slice(0, 40) : null,
        seenDateUtc,
        rawJsonText: JSON.stringify(a),
      };
    });

    if (toCreateArticles.length > 0) {
      await prisma.ingestedArticle.createMany({
        data: toCreateArticles,
      });
    }

    // Top5 新闻：按交易所/KOL/BD 影响排序
    const docs = picked.map((a, idx) => ({
      id: String(a?._urlCanonical || a?.url || idx),
      text: `${a?.title || ""} ${a?.excerpt || ""}`.slice(0, 5000),
    }));

    const { vectors } = buildTfIdf(docs);
    const similarity: { index: number; score: number }[][] = Array.from(
      { length: picked.length },
      () => []
    );

    for (let i = 0; i < picked.length; i++) {
      for (let j = i + 1; j < picked.length; j++) {
        const s = cosine(vectors[i], vectors[j]);
        if (s <= 0) continue;
        similarity[i].push({ index: j, score: s });
        similarity[j].push({ index: i, score: s });
      }
    }

    for (const arr of similarity) {
      arr.sort((a, b) => b.score - a.score);
    }

    const scored = picked.map((a, idx) => {
      const relatedIndexes = similarity[idx]
        .filter((x) => x.score >= RELATED_THRESHOLD)
        .slice(0, 8)
        .map((x) => x.index);

      const relatedSet = new Set<number>([idx, ...relatedIndexes]);
      const relatedItems = [...relatedSet].map((i) => picked[i]);

      const domains = new Set(
        relatedItems
          .map((x) => String(x?.domain || "").toLowerCase())
          .filter(Boolean)
      );

      const lastSeen = relatedItems
        .map((x) => parseGdeltSeenDateUtc(x?.seendate))
        .filter((x): x is Date => !!x)
        .sort((a, b) => b.getTime() - a.getTime())[0];

      const lastSeenUtc =
        lastSeen ||
        parseGdeltSeenDateUtc(a?.seendate) ||
        new Date();

      const volumeSignals = {
        article_count: relatedItems.length,
        unique_source_count: domains.size,
        last_seen_utc: lastSeenUtc.toISOString(),
      };

      const text = `${a?.title || ""} ${a?.excerpt || ""}`;
      const score = scoreArticle({
        text,
        lastSeenUtc,
        uniqueSourceCount: domains.size,
        relatedCount: relatedItems.length,
        isEurope: isEuropeArticle(a),
      });

      const axisHint = inferImpactAxis(text);

      return {
        idx,
        article: a,
        relatedIndexes,
        volumeSignals,
        score,
        isEuropeSource: isEuropeArticle(a),
        axisHint,
      };
    });

    scored.sort((a, b) => b.score - a.score);

    const chosen: typeof scored = [];
    const domainCount = new Map<string, number>();
    const titleKeys = new Set<string>();
    const axisCounts = new Map<string, number>();
    const axisOrder: Array<"注册" | "入金" | "交易"> = ["注册", "入金", "交易"];
    const maxPerAxis = 2;
    const needsAxis = () =>
      axisOrder.filter((a) => (axisCounts.get(a) || 0) === 0);

    const isTooSimilar = (candidateIdx: number) => {
      for (const pickedItem of chosen) {
        const sims = similarity[candidateIdx] || [];
        const hit = sims.find((x) => x.index === pickedItem.idx);
        if (hit && hit.score >= DUPLICATE_THRESHOLD) return true;
      }
      return false;
    };

    for (const s of scored) {
      const domain = String(s.article?.domain || "").toLowerCase();
      const used = domain ? domainCount.get(domain) || 0 : 0;
      if (domain && used >= 1) continue;

      const titleKey = normalizeTitle(s.article?.title || "");
      if (titleKey && titleKeys.has(titleKey)) continue;
      if (isTooSimilar(s.idx)) continue;

      if (!s.isEuropeSource) continue;

      const axis = s.axisHint;
      const needed = needsAxis();
      if (needed.length > 0 && !needed.includes(axis)) continue;
      if ((axisCounts.get(axis) || 0) >= maxPerAxis) continue;

      chosen.push(s);
      if (domain) domainCount.set(domain, used + 1);
      if (titleKey) titleKeys.add(titleKey);
      axisCounts.set(axis, (axisCounts.get(axis) || 0) + 1);
      if (chosen.length >= 5) break;
    }

    if (chosen.length < 5) {
      for (const s of scored) {
        if (chosen.find((x) => x.idx === s.idx)) continue;
        if (s.isEuropeSource) continue;
        const titleKey = normalizeTitle(s.article?.title || "");
        if (titleKey && titleKeys.has(titleKey)) continue;
        if (isTooSimilar(s.idx)) continue;
        if (s.score < 2.6) continue;
        const axis = s.axisHint;
        const needed = needsAxis();
        if (needed.length > 0 && !needed.includes(axis)) continue;
        if ((axisCounts.get(axis) || 0) >= maxPerAxis) continue;
        chosen.push(s);
        if (titleKey) titleKeys.add(titleKey);
        axisCounts.set(axis, (axisCounts.get(axis) || 0) + 1);
        if (chosen.length >= 5) break;
      }
    }

    if (chosen.length < 5) {
      for (const s of scored) {
        if (chosen.find((x) => x.idx === s.idx)) continue;
        const domain = String(s.article?.domain || "").toLowerCase();
        const used = domain ? domainCount.get(domain) || 0 : 0;
        if (domain && used >= 1) continue;
        const titleKey = normalizeTitle(s.article?.title || "");
        if (titleKey && titleKeys.has(titleKey)) continue;
        if (isTooSimilar(s.idx)) continue;
        chosen.push(s);
        if (domain) domainCount.set(domain, used + 1);
        if (titleKey) titleKeys.add(titleKey);
        axisCounts.set(
          s.axisHint,
          (axisCounts.get(s.axisHint) || 0) + 1
        );
        if (chosen.length >= 5) break;
      }
    }

    if (chosen.length < 5) {
      for (const s of scored) {
        if (chosen.find((x) => x.idx === s.idx)) continue;
        const titleKey = normalizeTitle(s.article?.title || "");
        if (titleKey && titleKeys.has(titleKey)) continue;
        chosen.push(s);
        if (titleKey) titleKeys.add(titleKey);
        if (chosen.length >= 5) break;
      }
    }

    const cards = [];
    for (let rank = 0; rank < chosen.length; rank++) {
      const c = chosen[rank];
      const primary = c.article;
      const related = c.relatedIndexes.map((i) => picked[i]);

      const evidence = buildEvidenceForArticle(primary, related);
      const evidencePack = buildEvidencePack([primary, ...related].slice(0, 8));

      const titles = [primary, ...related]
        .map((x) => String(x?.title || ""))
        .filter(Boolean)
        .slice(0, 8);

      const fetchResult = await fetchArticleText(String(primary?.url || ""));
      const bodyPoints =
        fetchResult.status === "ok" && fetchResult.text
          ? extractEvidencePoints(fetchResult.text, 3)
          : [];
      const bodyEvidence = bodyPoints.map((text) => ({
        text,
        url: String(primary?.url || ""),
        source_name: String(primary?.domain || "unknown"),
      }));

      let card = null;
      if (fetchResult.status === "ok" && evidencePack.length >= 1) {
        const prompt = buildRuntimeUserPrompt({
          evidencePack,
          bodyPoints,
          volumeSignals: c.volumeSignals,
          batchId,
        });
        card = await generateCardWithLLM({ prompt, evidencePack });
      }

      if (!card) {
        card = buildFallbackCard({
          primaryTitle: String(primary?.title || ""),
          primaryExcerpt: primary?.excerpt
            ? String(primary.excerpt).slice(0, 140)
            : null,
          evidence: bodyEvidence.length
            ? bodyEvidence.map((e, idx) => ({
                ...e,
                published_time_utc:
                  evidence[idx]?.published_time_utc ||
                  evidence[0]?.published_time_utc ||
                  nowUtcIso(),
              }))
            : evidence.map((e) => ({ ...e, text: undefined })),
          evidenceNote:
            fetchResult.status === "ok"
              ? null
              : "未抓到正文/仅基于标题与元信息",
          fetchStatus: fetchResult.status,
          fetchError: fetchResult.error || null,
          volumeSignals: c.volumeSignals,
          batchId,
          entities: titles,
          isEuropeSource: c.isEuropeSource,
        });
      }

      const ev0 = evidence[0];
      if (ev0) {
        card.source_name = card.source_name || ev0.source_name;
        card.published_time = card.published_time || ev0.published_time_utc;
        card.url = card.url || ev0.url;
      }
      const originalTitle = String(primary?.title || "").trim();
      if (originalTitle) {
        card.original_title = card.original_title || originalTitle;
      }
      card.fetch_status = fetchResult.status;
      card.fetch_error = fetchResult.error || undefined;
      const fallbackScore = fetchResult.status === "ok" ? 60 : 45;
      if (typeof card.impact_register_score !== "number")
        card.impact_register_score = fallbackScore;
      if (typeof card.impact_deposit_score !== "number")
        card.impact_deposit_score = fallbackScore;
      if (typeof card.impact_trading_score !== "number")
        card.impact_trading_score = fallbackScore;
      if (fetchResult.status !== "ok") {
        card.needs_review = true;
        card.confidence = "低";
        card.impact_register = "中性";
        card.impact_deposit = "中性";
        card.impact_trading = "中性";
        card.severity = "低";
        card.why_it_matters =
          "正文不可用，仅基于标题与元信息，影响暂无法确认（需人工确认）。";
        card.bd_angle = "口径建议：先说明已关注事件，等待更多官方细节确认。";
      }
      card.impact_axis = c.axisHint;
      card.evidence = undefined;
      card.evidence_points = undefined;
      card.evidence_note = undefined;
      if (!card.source_region) {
        card.source_region = guessRegion(primary);
      }
      if (!c.isEuropeSource && !card.source_note) {
        card.source_note = "非欧媒体来源";
      }

      cards.push({
        rank: rank + 1,
        score: c.score,
        clusterKey: String(primary?._urlCanonical || primary?.url || c.idx),
        cardJsonText: JSON.stringify(card),
      });
    }

    if (cards.length > 0) {
      await prisma.topicCard.createMany({
        data: cards.map((x) => ({
          batchId,
          rank: x.rank,
          score: x.score,
          clusterKey: x.clusterKey,
          cardJsonText: x.cardJsonText,
        })),
      });
    }

    if (batchCreated) {
      await prisma.batch.update({
        where: { id: batchId },
        data: {
          status: "success",
          error: null,
          articleCount: deduped.length,
          europeArticleCount: europeUnique.length,
          supplementLinksText,
        },
      });
    }
    revalidatePath("/");

    return NextResponse.json({
      ok: true,
      batchId,
      nowUtc: nowUtcIso(),
      windowUtc: { startdatetime: gdelt.startdatetime, enddatetime: gdelt.enddatetime },
      counts: {
        fetched: articlesRaw.length,
        deduped: deduped.length,
        europe: europeUnique.length,
        usedForRanking: picked.length,
      },
      top5: cards.map((c) => safeParseJson(c.cardJsonText, null)).filter(Boolean),
      supplement_links: crypto.items || [],
      note: "MVP：抓取→去重→相关性匹配→Top5新闻→入库（SQLite TEXT JSON）。",
    });
  } catch (e: any) {
    const msg = String(e?.message || e);
    let msgShort = msg.length > 4000 ? `${msg.slice(0, 4000)}…` : msg;
    if (/GDELT HTTP 429/i.test(msgShort)) {
      msgShort = "GDELT 限流：请等待 5-10 秒后再刷新。";
    }

    if (batchCreated) {
      try {
        await prisma.batch.update({
          where: { id: batchId },
          data: { status: "failed", error: msgShort },
        });
      } catch {
        // swallow
      }
    }

    return NextResponse.json(
      { ok: false, error: msgShort, batchId },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}

