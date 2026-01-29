import type { TopicCard } from "@/lib/types/topicCard";

const CATEGORIES = [
  "监管与合规",
  "执法与诉讼",
  "交易所与产品",
  "稳定币与支付通道",
  "机构与ETF",
  "安全与黑客",
  "税务与银行",
  "市场与宏观叙事",
] as const;

type Category = (typeof CATEGORIES)[number];

type Evidence = {
  url: string;
  source_name: string;
  published_time_utc: string;
};

export function classifyCategory(text: string): Category {
  const t = text.toLowerCase();
  if (/(mica|aml|regulat|compliance|license|kyc)/.test(t)) return "监管与合规";
  if (/(lawsuit|court|sec|doj|enforcement|fine|charge|penalty)/.test(t)) return "执法与诉讼";
  if (/(hack|exploit|breach|vulnerab|phish|drain|attack)/.test(t)) return "安全与黑客";
  if (/(stablecoin|payment|card|settle|usdc|usdt|on-?ramp|off-?ramp|sepa|iban)/.test(t))
    return "稳定币与支付通道";
  if (/(etf|blackrock|fidelity|institution|s-?1|spot etf)/.test(t)) return "机构与ETF";
  if (/(tax|bank|banking|custody|wire|sepa|swift)/.test(t)) return "税务与银行";
  if (
    /(exchange|listing|launch|delist|product|futures|derivative|perpetual|margin|okx|binance|coinbase|kraken|bybit|bitget)/.test(
      t
    )
  )
    return "交易所与产品";
  return "市场与宏观叙事";
}

function pickBdImpact(cat: Category): string {
  if (cat === "监管与合规")
    return "合规审核：监管/牌照变化影响市场准入，拉新转化或波动10-25%。";
  if (cat === "执法与诉讼")
    return "用户风险教育：执法负面影响信任，拉新转化或下滑10-30%。";
  if (cat === "安全与黑客")
    return "用户风险教育：安全事件需风控沟通，入金转化或下滑10-25%。";
  if (cat === "稳定币与支付通道")
    return "入金/出金：支付通道变化影响法币入金，转化或波动10-35%。";
  if (cat === "机构与ETF")
    return "竞争对手叙事：机构动向改变市场预期，拉新转化或波动5-15%。";
  if (cat === "税务与银行")
    return "入金/出金：银行/税务政策影响通道，入金转化或下滑15-40%。";
  if (cat === "交易所与产品")
    return "衍生品/合约：交易所产品变动影响交易量，活跃或波动10-40%。";
  return "获客/广告：宏观情绪变化影响投放效率，拉新转化或波动5-20%。";
}

function toCnTitle(primaryTitle: string, cat: Category): string {
  const short = primaryTitle.trim();
  if (short && hasChinese(short)) return short.slice(0, 30);
  const map: Record<Category, string> = {
    "监管与合规": "监管合规动态",
    "执法与诉讼": "执法诉讼升级",
    "交易所与产品": "交易所产品动态",
    "稳定币与支付通道": "稳定币与支付",
    "机构与ETF": "机构ETF进展",
    "安全与黑客": "安全与黑客事件",
    "税务与银行": "税务银行收紧",
    "市场与宏观叙事": "市场宏观叙事",
  };
  return map[cat].slice(0, 30);
}

function confidenceLevel(
  articleCount: number,
  uniqueSourceCount: number
): "高" | "中" | "低" {
  if (articleCount >= 6 && uniqueSourceCount >= 4) return "高";
  if (articleCount >= 3 && uniqueSourceCount >= 2) return "中";
  return "低";
}

function extractEntities(titles: string[]): string[] {
  const ents = new Map<string, number>();
  for (const s of titles) {
    const ms = s.match(/\b[A-Z][a-zA-Z]{2,}\b/g) || [];
    for (const w of ms) ents.set(w, (ents.get(w) || 0) + 1);
  }
  return [...ents.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([w]) => w)
    .slice(0, 5);
}

function hasChinese(s: string | null | undefined) {
  if (!s) return false;
  return /[\u4e00-\u9fff]/.test(s);
}

export function buildFallbackCard(input: {
  primaryTitle: string;
  primaryExcerpt?: string | null;
  evidence: Evidence[];
  volumeSignals: {
    article_count: number;
    unique_source_count: number;
    last_seen_utc: string;
  };
  batchId: string;
  titles: string[];
}): TopicCard {
  const text = `${input.primaryTitle} ${input.primaryExcerpt || ""}`.trim();
  const cat = classifyCategory(text);
  const titleCn = toCnTitle(input.primaryTitle, cat);
  let tldr = "";
  if (hasChinese(input.primaryTitle)) {
    const excerptCn = hasChinese(input.primaryExcerpt || "")
      ? `，${String(input.primaryExcerpt).trim()}`
      : "";
    tldr = `欧洲媒体报道：${input.primaryTitle}${excerptCn}`;
  } else {
    tldr = `欧洲媒体报道：${titleCn}，对交易所/KOL/BD 决策构成影响。`;
  }
  tldr = tldr.slice(0, 90);
  return {
    title: titleCn.slice(0, 30),
    category: cat,
    tldr,
    bd_impact: pickBdImpact(cat).slice(0, 80),
    entities: extractEntities(input.titles).slice(0, 5),
    evidence: input.evidence.slice(0, 3),
    volume_signals: input.volumeSignals,
    confidence: confidenceLevel(
      input.volumeSignals.article_count,
      input.volumeSignals.unique_source_count
    ),
    batch_id: input.batchId,
  };
}
