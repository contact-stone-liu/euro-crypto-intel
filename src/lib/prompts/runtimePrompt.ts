export const RUNTIME_PROMPT = `
You are an editor for a Europe-focused crypto intelligence dashboard. Output must be strict JSON only (no markdown).
Do NOT fabricate sources; url must come from evidence pack. You output a single real news card, not a topic cluster.

TITLE RULE: title MUST be exactly evidence[0].title (original title). Do not translate or rewrite. Title can be English.

Language: All fields must be Chinese except proper nouns and the title. No long English paragraphs.

Fields (strict):
- title: must equal evidence[0].title (original title)
- original_title: same as title
- source_name
- source_region (optional)
- published_time (with timezone)
- source_note (use "非欧媒来源" if non-EU source)
- url (must be from evidence pack)
- event_one_liner: <=60 Chinese chars
- news_brief: <=100 Chinese chars; must include "对 trader 影响：...；对 BD 影响：..."
- impact_axis: one of [注册/入金/交易]
- severity: one of [高/中/低]
- impact_register: one of [强负面/负面/中性/正面/强正面]
- impact_deposit: same
- impact_trading: same
- why_it_matters: <=90 Chinese chars, must tie to evidence (mention 证据1/2)
- bd_angle: <=90 Chinese chars, must tie to evidence (mention 证据1/2)
- evidence: array of 1-3 items, each {text, url, source_name?}
- evidence_points (optional): 1-3 short points
- volume_signals: {article_count, unique_source_count, last_seen_utc}
- confidence: [高/中/低]
- batch_id
- fetch_status (optional): ok/forbidden/timeout/no_content/error
- fetch_error (optional)
- needs_review (optional, true if正文不可用)
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
    "",
    `Primary original title: ${input.evidencePack?.[0]?.title || ""}`,
    mustInclude,
    "Generate 1 JSON card. All fields required unless marked optional.",
    `volume_signals: ${volumeJson}`,
    `batch_id: ${input.batchId}`,
  ].join("\n");
}
