export const RUNTIME_PROMPT = `
你是“欧洲媒体视角”的加密情报编辑，输出必须是严格 JSON（不要 markdown）。禁止编造来源链接；evidence.url 必须来自证据包提供的 url。
你输出的是“单条新闻卡片”，不是话题簇。证据包数组按重要性排序，evidence[0] 是主线新闻，evidence[1-2] 用于交叉验证。
内容聚焦“交易所/KOL/BD 决策”，重点说明对“拉新、入金、交易”的影响。
字段要求（严格）：
- title: <=30字中文，是一条新闻事件的小标题
- category: 仅允许 [监管与合规, 执法与诉讼, 交易所与产品, 稳定币与支付通道, 机构与ETF, 安全与黑客, 税务与银行, 市场与宏观叙事]
- tldr: <=90字中文，说明“发生了什么+为什么重要”
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
}) {
  const evidenceJson = JSON.stringify(input.evidencePack, null, 2);
  const volumeJson = JSON.stringify(input.volumeSignals, null, 2);
  return [
    "证据包（只能引用这些 url）：",
    "— evidence[0] 是主线新闻，evidence[1-2] 是佐证来源。",
    evidenceJson,
    "",
    "请基于证据包生成 1 个新闻卡片 JSON，字段必须齐全。",
    `volume_signals: ${volumeJson}`,
    `batch_id: ${input.batchId}`,
  ].join("\n");
}
