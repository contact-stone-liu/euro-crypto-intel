export const RUNTIME_PROMPT = `
You are an editor for a Europe-focused crypto intelligence dashboard. Output must be strict JSON only (no markdown).
Do NOT fabricate sources; url must come from evidence pack.

Title rules:
- original_title MUST be exactly evidence[0].title (original title)
- title MUST be a Chinese translation of original_title (keep proper nouns; no English sentence)

Language: All fields must be Chinese except proper nouns and original_title.
Avoid templated phrasing; be specific and informative.

Fields (strict):
- title: Chinese translation of original_title
- original_title: must equal evidence[0].title
- source_name
- source_region (optional)
- published_time (with timezone)
- source_note (use "非欧媒体来源" if non-EU source)
- url (must be from evidence pack)
- event_one_liner: <=60 Chinese chars, meaningful summary
- news_brief: <=120 Chinese chars, specific facts, no templates
- impact_axis: one of [注册/入金/交易]
- severity: one of [高/中/低]
- impact_register: one of [强负面/负面/中性/正面/强正面]
- impact_register_score: integer 0-100
- impact_deposit: one of [强负面/负面/中性/正面/强正面]
- impact_deposit_score: integer 0-100
- impact_trading: one of [强负面/负面/中性/正面/强正面]
- impact_trading_score: integer 0-100
- score guidance: 0-20 very negative, 40-60 neutral, 80-100 very positive
- why_it_matters: <=90 Chinese chars, explain mechanism/implication
- bd_angle: <=90 Chinese chars, actionable BD angle
- volume_signals: {article_count, unique_source_count, last_seen_utc}
- confidence: [高/中/低]
- batch_id
- fetch_status (optional): ok/forbidden/timeout/no_content/error
- fetch_error (optional)
- needs_review (optional, true if正文不可用)

Do NOT output evidence/evidence_points.
`.trim();

export type EvidenceItem = {
  url: string;
  title: string;
  excerpt?: string;
  source_name: string;
  published_time_utc: string;
};

export function buildRuntimeUserPrompt(input: {
  evidencePack: EvidenceItem[];
  bodyPoints?: string[];
  volumeSignals: {
    article_count: number;
    unique_source_count: number;
    last_seen_utc: string;
  };
  batchId: string;
  titleMustInclude?: string[];
}) {
  const evidenceJson = JSON.stringify(input.evidencePack, null, 2);
  const volumeJson = JSON.stringify(input.volumeSignals, null, 2);
  const bodyJson = input.bodyPoints?.length
    ? JSON.stringify(input.bodyPoints.slice(0, 5), null, 2)
    : "";
  const mustInclude =
    input.titleMustInclude && input.titleMustInclude.length > 0
      ? `Title must include at least one of these tokens: ${input.titleMustInclude.join(
          " / "
        )}`
      : "";
  return [
    "Evidence pack (only these urls allowed):",
    "evidence[0] is the primary article; evidence[1-2] are supporting sources.",
    evidenceJson,
    bodyJson ? "正文要点（可选，用于更好的摘要）：" : "",
    bodyJson || "",
    "",
    `Primary original title: ${input.evidencePack?.[0]?.title || ""}`,
    mustInclude,
    "Translate the original title into Chinese for the title field.",
    "Generate 1 JSON card. All fields required unless marked optional.",
    `volume_signals: ${volumeJson}`,
    `batch_id: ${input.batchId}`,
  ].join("\n");
}

