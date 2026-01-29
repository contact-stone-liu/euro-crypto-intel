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

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------- utils ----------
function nowUtcIso() {
  return new Date().toISOString();
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
  const expected = process.env.REFRESH_SECRET || process.env.CRON_SECRET || "";
  if (!expected) return false;

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
  return provided === expected;
}

const PUBLIC_REFRESH = (process.env.PUBLIC_REFRESH || "").trim() === "1";
const PUBLIC_REFRESH_COOLDOWN_MINUTES = Number(
  process.env.PUBLIC_REFRESH_COOLDOWN_MINUTES || "30"
);

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
  const minMs = PUBLIC_REFRESH_COOLDOWN_MINUTES * 60 * 1000;
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
  "AL","AD","AT","BE","BG","BA","BY","CH","CY","CZ","DE","DK","EE","ES","FI","FR","GB","GR","HR","HU","IE","IS","IT",
  "LI","LT","LU","LV","MC","MD","ME","MK","MT","NL","NO","PL","PT","RO","RS","SE","SI","SK","SM","UA","VA",
]);

const EURO_TLDS = new Set([
  "de","fr","it","es","nl","be","se","no","dk","fi","ie","pt","pl","cz","sk","hu","ro","bg","gr","at","ch","uk",
]);

function isEuropeArticle(a: any): boolean {
  const sc = String(a?.sourceCountry || a?.sourcecountry || "").toUpperCase();
  if (sc && EURO_COUNTRIES.has(sc)) return true;

  const domain = String(a?.domain || "").toLowerCase();
  const tld = domain.split(".").pop() || "";
  if (tld && EURO_TLDS.has(tld)) return true;

  return false;
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
      const cu = canonicalizeUrl(url);
      if (!cu) continue;
      if (seen.has(cu)) continue;
      seen.add(cu);
      deduped.push({ ...a, _urlCanonical: cu });
    }

    const europe = deduped.filter(isEuropeArticle);
    const picked = europe.length >= 30 ? europe : deduped;

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
            europeArticleCount: europe.length,
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
          europe: europe.length,
          usedForRanking: 0,
        },
        top5: [],
        supplement_links: crypto.items || [],
        note: "本次窗口没有抓到文章：已记录成功 batch，但未生成卡片。",
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
        .filter((x) => x.score >= 0.2)
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

      return {
        idx,
        article: a,
        relatedIndexes,
        volumeSignals,
        score,
      };
    });

    scored.sort((a, b) => b.score - a.score);

    const chosen: typeof scored = [];
    const domainCount = new Map<string, number>();
    for (const s of scored) {
      const domain = String(s.article?.domain || "").toLowerCase();
      const used = domain ? domainCount.get(domain) || 0 : 0;
      if (domain && used >= 1) continue;
      chosen.push(s);
      if (domain) domainCount.set(domain, used + 1);
      if (chosen.length >= 5) break;
    }

    if (chosen.length < 5) {
      for (const s of scored) {
        if (chosen.find((x) => x.idx === s.idx)) continue;
        chosen.push(s);
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

      let card = null;
      if (evidencePack.length >= 3) {
        const prompt = buildRuntimeUserPrompt({
          evidencePack,
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
          evidence,
          volumeSignals: c.volumeSignals,
          batchId,
          titles,
        });
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
          europeArticleCount: europe.length,
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
        europe: europe.length,
        usedForRanking: picked.length,
      },
      top5: cards.map((c) => safeParseJson(c.cardJsonText, null)).filter(Boolean),
      supplement_links: crypto.items || [],
      note: "MVP：抓取→去重→相关性匹配→Top5新闻→入库（SQLite TEXT JSON）。",
    });
  } catch (e: any) {
    const msg = String(e?.message || e);
    const msgShort = msg.length > 4000 ? `${msg.slice(0, 4000)}…` : msg;

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
