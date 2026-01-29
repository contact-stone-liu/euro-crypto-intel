import type { TopicCard } from "@/lib/types/topicCard";

type Evidence = {
  text?: string;
  url: string;
  source_name: string;
  published_time_utc: string;
};

function hasChinese(s: string | null | undefined) {
  if (!s) return false;
  return /[\u4e00-\u9fff]/.test(s);
}

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
  const published = evidence0?.published_time_utc || input.volumeSignals.last_seen_utc;

  const eventOne = input.primaryTitle
    ? `发生事件：${input.primaryTitle}`
    : "发生事件：欧洲媒体披露交易所相关风险/政策变化";

  const newsBrief = `发生了事件并引发市场关注。对 trader 影响：短期波动或风控预期上升；对 BD 影响：需调整拉新/入金沟通。`
    .slice(0, 100);

  const needsReview = input.fetchStatus && input.fetchStatus !== "ok";
  const impactLabel = needsReview ? "中性" : "负面";
  const severity = needsReview ? "低" : "中";

  const evidenceItems =
    input.evidence
      ?.filter((e) => e?.text)
      .slice(0, 3)
      .map((e) => ({
        text: String(e.text || "").slice(0, 60),
        url: e.url,
        source_name: e.source_name,
      })) || [];

  return {
    title: originalTitle,
    original_title: originalTitle,
    source_name: evidence0?.source_name || "未知媒体",
    source_region: undefined,
    published_time: published,
    source_note: input.isEuropeSource ? undefined : "非欧媒来源",
    url: evidence0?.url || "https://example.com",
    event_one_liner: eventOne.slice(0, 60),
    news_brief: newsBrief,
    impact_axis: "入金",
    severity,
    impact_register: impactLabel,
    impact_deposit: impactLabel,
    impact_trading: impactLabel,
    why_it_matters: needsReview
      ? "正文不可用，仅基于标题与元信息，影响暂无法确认（需人工确认）。"
      : "该事件可能影响交易所入金通道与用户信任，导致转化与交易受限（见证据1）。",
    bd_angle: needsReview
      ? "口径建议：先说明已关注事件，等待更多官方细节确认。"
      : "对外口径：强调风险已评估、通道与交易保障措施到位（见证据1）。",
    evidence_points: evidenceItems.length
      ? evidenceItems.map((e) => e.text).slice(0, 3)
      : undefined,
    evidence: evidenceItems.length ? evidenceItems : undefined,
    evidence_note: evidenceItems.length
      ? undefined
      : input.evidenceNote || "未抓到正文/仅基于标题与元信息",
    fetch_status: (input.fetchStatus as any) || undefined,
    fetch_error: input.fetchError || undefined,
    needs_review: needsReview || undefined,
    entities: input.entities.slice(0, 5),
    volume_signals: input.volumeSignals,
    confidence: needsReview ? "低" : "中",
    batch_id: input.batchId,
  };
}
