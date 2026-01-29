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
  if (/(lawsuit|court|sec|doj|enforcement|fine|charge)/.test(t)) return "执法与诉讼";
  if (/(hack|exploit|breach|vulnerab|phish|drain|attack)/.test(t)) return "安全与黑客";
  if (/(stablecoin|payment|card|settle|usdc|usdt|on-?ramp|off-?ramp)/.test(t))
    return "稳定币与支付通道";
  if (/(etf|blackrock|fidelity|institution|s-?1|spot etf)/.test(t)) return "机构与ETF";
  if (/(tax|bank|banking|custody|wire|sepa|swift)/.test(t)) return "税务与银行";
  if (
    /(exchange|launch|listing|product|futures|derivative|perpetual|okx|binance|coinbase|kraken|bybit|bitget)/.test(t)
  )
    return "交易所与产品";
  return "市场与宏观叙事";
}

function pickBdImpact(cat: Category): string {
  if (cat === "监管与合规") return "合规审核：监管/牌照信号会影响市场准入与KYC策略。";
  if (cat === "执法与诉讼") return "用户风险教育：执法与诉讼会影响用户信心与合规沟通口径。";
  if (cat === "安全与黑客") return "用户风险教育：安全事件需要快速风控提示与资产安全沟通。";
  if (cat === "稳定币与支付通道") return "入金/出金：支付通道与稳定币流转影响入金体验与转化。";
  if (cat === "机构与ETF") return "竞争对手叙事：机构动向会改变市场叙事与投放重点。";
  if (cat === "税务与银行") return "入金/出金：银行/税务政策变化会影响法币通道与合规成本。";
  if (cat === "交易所与产品") return "衍生品/合约：交易所产品/合约动向影响竞争与用户迁移。";
  return "获客/广告：宏观叙事变化会影响投放素材与转化路径。";
}

function toCnTitle(cat: Category): string {
  const map: Record<Category, string> = {
    "监管与合规": "监管合规动向",
    "执法与诉讼": "执法诉讼升级",
    "交易所与产品": "交易所产品战",
    "稳定币与支付通道": "稳定币与支付",
    "机构与ETF": "机构ETF进展",
    "安全与黑客": "安全与黑客事件",
    "税务与银行": "税务银行收紧",
    "市场与宏观叙事": "市场宏观叙事",
  };
  return map[cat].slice(0, 14);
}

function confidenceLevel(
  articleCount: number,
  uniqueSourceCount: number
): "高" | "中" | "低" {
  if (articleCount >= 12 && uniqueSourceCount >= 6) return "高";
  if (articleCount >= 6 && uniqueSourceCount >= 3) return "中";
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

export function buildFallbackCard(input: {
  titles: string[];
  evidence: Evidence[];
  volumeSignals: {
    article_count: number;
    unique_source_count: number;
    last_seen_utc: string;
  };
  batchId: string;
}): TopicCard {
  const cat = classifyCategory(input.titles.join(" "));
  return {
    title: toCnTitle(cat).slice(0, 14),
    category: cat,
    tldr: `过去24小时该主题报道${input.volumeSignals.article_count}篇，来源${input.volumeSignals.unique_source_count}个，热度集中上升。`.slice(
      0,
      90
    ),
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
