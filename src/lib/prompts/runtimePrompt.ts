export const RUNTIME_PROMPT = `
你是“欧洲媒体视角”的加密情报编辑，输出必须是严格 JSON（不要 markdown）。禁止编造来源链接；url 必须来自证据包的 url。
你输出的是“单条新闻卡片”（真实新闻文章），不是话题簇。标题必须是 evidence[0].title 的中文翻译（意思一致、保留专有名词/数字/机构名）。
输出语言必须全中文（专有名词可保留英文），不要输出英文长段落。
字段要求（严格）：
- title: <=18字中文，必须与 evidence[0].title 对应（中文翻译，不能写成“监管动态”等泛化标题）
- source_name: 媒体名
- source_region: 国家/地区（能判断就填）
- published_time: 发布时间（含时区，如 2026-01-29T10:35:09Z）
- source_note: 若非欧媒但入选，填“非欧媒来源”，否则留空
- url: 原文链接（来自证据包）
- event_one_liner: <=60字，说明发生了什么
- news_brief: <=100字，必须讲清楚“发生了什么 + 对 trader 影响 + 对 BD 影响”，用“对 trader 影响：…；对 BD 影响：…”格式
- impact_axis: 从 [注册/入金/交易] 选一个，表示主要链路
- severity: [高/中/低]
- impact_register: [强负面/负面/中性/正面/强正面]
- impact_deposit: [强负面/负面/中性/正面/强正面]
- impact_trading: [强负面/负面/中性/正面/强正面]
- why_it_matters: <=90字，必须落到链路机制
- bd_angle: <=90字，给可对外口径一句话
- evidence_points: 2条最关键原文要点（每条<=25字）
- entities: 最多5个关键实体
- volume_signals: {article_count, unique_source_count, last_seen_utc}
- confidence: [高/中/低]
- batch_id: 原样返回
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
      ? `标题需包含以下至少一个关键词（来自主新闻）：${input.titleMustInclude.join(" / ")}`
      : "";
  return [
    "证据包（只能引用这些 url）：",
    "— evidence[0] 是主线新闻，evidence[1-2] 是佐证来源。",
    evidenceJson,
    "",
    `主新闻原文标题: ${input.evidencePack?.[0]?.title || ""}`,
    mustInclude,
    "请基于证据包生成 1 个新闻卡片 JSON，字段必须齐全。",
    `volume_signals: ${volumeJson}`,
    `batch_id: ${input.batchId}`,
  ].join("\n");
}
