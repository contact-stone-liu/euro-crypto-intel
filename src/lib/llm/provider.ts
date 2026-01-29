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

  // 强制中文输出：标题/简述/影响必须含中文
  if (
    !hasChinese(z.data.title) ||
    !hasChinese(z.data.news_brief) ||
    !hasChinese(z.data.bd_impact)
  ) {
    return null;
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
