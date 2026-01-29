export const RUNTIME_PROMPT = `
你是“欧洲媒体视角”的加密情报编辑，输出必须是严格 JSON（不要 markdown）。禁止编造来源链接；evidence.url 必须来自证据包提供的 url。
你输出的是“单条新闻卡片”，不是话题簇。证据包数组按重要性排序，evidence[0] 是主线新闻，evidence[1-2] 用于交叉验证。
内容聚焦“交易所/KOL/BD 决策”，必须具体到事件本身，避免泛化表述。
标题必须是 evidence[0].title 的中文翻译（意思一致、尽量保留专有名词/数字/机构名）。
字段要求（严格）：
- title: <=30字中文，必须与 evidence[0].title 对应（中文翻译，不能写成“监管动态”等泛化标题）
- news_brief: <=100字中文，必须讲清楚“发生了什么 + 对 trader 影响 + 对 BD 影响”
- category: 自拟短标签（<=12字中文），由模型判断最贴切类别
- tldr: <=90字中文，说明“发生了什么+为什么重要”，必须点出具体事件/主体
- bd_impact: <=80字中文，必须显式落到链路维度（从下列选1-2个并解释原因）：
  [获客/广告, KOL内容尺度, 入金/出金, 衍生品/合约, 合规审核, 竞争对手叙事, 用户风险教育]
  bd_impact 必须包含一个“10-30%”格式的影响范围（用百分比区间）
- entities: 最多5个
- evidence: 3条来源链接（必须来自证据包；包含 source_name 与 published_time_utc）
- volume_signals: {article_count, unique_source_count, last_seen_utc}
- confidence: [高, 中, 低]
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
    mustInclude,
    "请基于证据包生成 1 个新闻卡片 JSON，字段必须齐全。",
    `volume_signals: ${volumeJson}`,
    `batch_id: ${input.batchId}`,
  ].join("\n");
}
