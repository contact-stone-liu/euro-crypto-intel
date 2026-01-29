import type { TopicCard } from "@/lib/types/topicCard";

type Evidence = {
  url: string;
  source_name: string;
  published_time_utc: string;
};

function hasChinese(s: string | null | undefined) {
  if (!s) return false;
  return /[\u4e00-\u9fff]/.test(s);
}

function toCnTitle(primaryTitle: string): string {
  const short = (primaryTitle || "").trim();
  if (short && hasChinese(short)) return short.slice(0, 18);
  return "欧洲媒体关注事件";
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
  entities: string[];
  isEuropeSource: boolean;
}): TopicCard {
  const titleCn = toCnTitle(input.primaryTitle);
  const evidence0 = input.evidence[0];
  const published = evidence0?.published_time_utc || input.volumeSignals.last_seen_utc;

  const eventOne = hasChinese(input.primaryTitle)
    ? `发生事件：${input.primaryTitle}`
    : "发生事件：欧洲媒体披露交易所相关风险/政策变化";

  const newsBrief = `发生了事件并引发市场关注。对 trader 影响：短期波动或风控预期上升；对 BD 影响：需调整拉新/入金沟通。`
    .slice(0, 100);

  return {
    title: titleCn.slice(0, 18),
    source_name: evidence0?.source_name || "未知媒体",
    source_region: undefined,
    published_time: published,
    source_note: input.isEuropeSource ? undefined : "非欧媒来源",
    url: evidence0?.url || "https://example.com",
    event_one_liner: eventOne.slice(0, 60),
    news_brief: newsBrief,
    impact_axis: "入金",
    severity: "中",
    impact_register: "中性",
    impact_deposit: "负面",
    impact_trading: "负面",
    why_it_matters: "该事件可能影响交易所入金通道与用户信任，导致转化与交易受限。",
    bd_angle: "对外可强调风险已评估、通道与交易保障措施到位。",
    evidence_points: [
      "原文披露交易所相关限制",
      "市场与用户关注度上升",
    ],
    entities: input.entities.slice(0, 5),
    volume_signals: input.volumeSignals,
    confidence: "中",
    batch_id: input.batchId,
  };
}
