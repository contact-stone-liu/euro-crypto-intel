import type { TopicCard } from "@/lib/types/topicCard";

type Evidence = {
  text?: string;
  url: string;
  source_name: string;
  published_time_utc: string;
};

export function buildFallbackCard(input: {
  primaryTitle: string;
  primaryExcerpt?: string | null;
  evidence: Evidence[];
  evidenceNote?: string | null;
  fetchStatus?: string | null;
  fetchError?: string | null;
  volumeSignals: {
    article_count: number;
    unique_source_count: number;
    last_seen_utc: string;
  };
  batchId: string;
  entities: string[];
  isEuropeSource: boolean;
}): TopicCard {
  const originalTitle = (input.primaryTitle || "").trim() || "未知标题";
  const evidence0 = input.evidence[0];
  const published =
    evidence0?.published_time_utc || input.volumeSignals.last_seen_utc;

  const eventOne = input.primaryTitle
    ? `发生事件：${input.primaryTitle}`
    : "发生事件：欧洲媒体披露交易所相关风险/政策变化";

  const newsBrief = (input.primaryExcerpt || input.primaryTitle || "")
    .toString()
    .slice(0, 100);

  const needsReview = input.fetchStatus && input.fetchStatus !== "ok";
  const impactLabel = needsReview ? "中性" : "负面";
  const severity = needsReview ? "低" : "中";

  return {
    title: originalTitle,
    original_title: originalTitle,
    source_name: evidence0?.source_name || "未知媒体",
    source_region: undefined,
    published_time: published,
    source_note: input.isEuropeSource ? undefined : "非欧媒体来源",
    url: evidence0?.url || "https://example.com",
    event_one_liner: eventOne.slice(0, 60),
    news_brief: newsBrief,
    impact_axis: "入金",
    severity,
    impact_register: impactLabel,
    impact_register_score: needsReview ? 45 : 65,
    impact_deposit: impactLabel,
    impact_deposit_score: needsReview ? 45 : 65,
    impact_trading: impactLabel,
    impact_trading_score: needsReview ? 45 : 65,
    why_it_matters: needsReview
      ? "正文不可用，仅基于标题与元信息，影响暂无法确认（需人工确认）。"
      : "该事件可能影响入金通道与用户信任，进而影响转化与交易。",
    bd_angle: needsReview
      ? "对外口径：说明已关注事件，等待更多官方细节确认。"
      : "对外口径：强调风控评估与通道保障措施已到位。",
    fetch_status: (input.fetchStatus as any) || undefined,
    fetch_error: input.fetchError || undefined,
    needs_review: needsReview || undefined,
    entities: input.entities.slice(0, 5),
    volume_signals: input.volumeSignals,
    confidence: needsReview ? "低" : "中",
    batch_id: input.batchId,
  };
}

