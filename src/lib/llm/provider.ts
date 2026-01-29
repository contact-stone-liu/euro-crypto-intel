import { RUNTIME_PROMPT } from "@/lib/prompts/runtimePrompt";
import { TopicCard, TopicCardSchema } from "@/lib/types/topicCard";

type EvidenceItem = {
  url: string;
  title: string;
  excerpt?: string;
  source_name: string;
  published_time_utc: string;
};

export async function generateCardWithLLM(input: {
  prompt: string;
  evidencePack: EvidenceItem[];
}): Promise<TopicCard | null> {
  const provider = (process.env.LLM_PROVIDER || "").trim();
  const apiKey = (process.env.LLM_API_KEY || "").trim();
  const baseUrl = (process.env.LLM_BASE_URL || "https://api.openai.com/v1").trim();
  const model = (process.env.LLM_MODEL || "").trim();

  // 没有 key 就返回 null，让上层走降级模板
  if (!apiKey || !model || provider !== "openai_compatible") return null;

  const body = {
    model,
    temperature: 0.2,
    messages: [
      { role: "system", content: RUNTIME_PROMPT },
      { role: "user", content: input.prompt }
    ]
  };

  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) return null;

  const json: any = await res.json();
  const text: string = json?.choices?.[0]?.message?.content || "";

  // 尝试直接 parse JSON
  const parsed = safeJsonParse(text);
  if (!parsed) return null;

  const z = TopicCardSchema.safeParse(parsed);
  if (!z.success) return null;

  // 关键：禁止编造证据链接 —— evidence url 必须来自 evidencePack
  const allowed = new Set(input.evidencePack.map(e => e.url));
  const evidenceOk = z.data.evidence.every(e => allowed.has(e.url));
  if (!evidenceOk) return null;

  // 强制中文输出：标题/摘要/影响必须含中文
  if (
    !hasChinese(z.data.title) ||
    !hasChinese(z.data.tldr) ||
    !hasChinese(z.data.bd_impact) ||
    !hasChinese(z.data.news_brief)
  ) {
    return null;
  }

  // 新闻简述需明确提到 trader 与 BD 影响
  const brief = z.data.news_brief || "";
  const hasTrader = /trader|交易员|交易者/i.test(brief);
  const hasBd = /BD|业务拓展|商务/i.test(brief);
  if (!hasTrader || !hasBd) return null;

  // 要求标题更具体：不能是泛化词
  const genericTitle =
    /动态|趋势|综述|概览|解读|观察|盘点|关注|焦点|进展|动向/;
  if (genericTitle.test(z.data.title)) return null;

  // 标题需包含主新闻中的关键实体/数字（至少命中一个）
  const primaryTitle = input.evidencePack?.[0]?.title || "";
  const keyTokens = extractKeyTokens(primaryTitle);
  if (keyTokens.length > 0) {
    const titleLower = z.data.title.toLowerCase();
    const hit = keyTokens.some((t) => titleLower.includes(t.toLowerCase()));
    if (!hit) return null;
  }

  return z.data;
}

function safeJsonParse(s: string): any | null {
  try {
    // 有些模型会包 ```json ... ```，这里剥离
    const trimmed = s.trim()
      .replace(/^```json/i, "")
      .replace(/^```/i, "")
      .replace(/```$/i, "")
      .trim();
    return JSON.parse(trimmed);
  } catch {
    return null;
  }
}

function hasChinese(s: string | null | undefined) {
  if (!s) return false;
  return /[\u4e00-\u9fff]/.test(s);
}

function extractKeyTokens(title: string): string[] {
  const tokens = new Set<string>();
  const nums = title.match(/\d+([.,]\d+)?%?/g) || [];
  nums.forEach((n) => tokens.add(n));

  const acronyms = title.match(/\b[A-Z]{2,}\b/g) || [];
  acronyms.forEach((w) => tokens.add(w));

  return [...tokens].slice(0, 8);
}
