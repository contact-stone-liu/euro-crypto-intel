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
  let baseUrl = (process.env.LLM_BASE_URL || "").trim();
  const model = (process.env.LLM_MODEL || "").trim();
  const timeoutMs = Number(process.env.LLM_TIMEOUT_MS || "12000");

  const isOpenAiCompat = provider === "openai_compatible" || provider === "gemini";
  const defaultBase =
    provider === "gemini"
      ? "https://generativelanguage.googleapis.com/v1beta/openai"
      : "https://api.openai.com/v1";
  if (!baseUrl) baseUrl = defaultBase;

  // No key/model or incompatible provider: fall back to template output.
  if (!apiKey || !model || !isOpenAiCompat) return null;

  const body = {
    model,
    temperature: 0.2,
    messages: [
      { role: "system", content: RUNTIME_PROMPT },
      { role: "user", content: input.prompt }
    ]
  };

  baseUrl = normalizeBaseUrl(baseUrl);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(
        `[llm] failed ${res.status} ${res.statusText}: ${errText.slice(0, 300)}`
      );
      return null;
    }

    const json: any = await res.json();
    const text: string = json?.choices?.[0]?.message?.content || "";

  // 灏濊瘯鐩存帴 parse JSON
  const parsed = safeJsonParse(text);
  if (!parsed) return null;

  const z = TopicCardSchema.safeParse(parsed);
  if (!z.success) return null;

  // 鍏抽敭锛氱姝㈢紪閫犺瘉鎹摼鎺?鈥斺€?url 蹇呴』鏉ヨ嚜 evidencePack
  const allowed = new Set(input.evidencePack.map((e) => e.url));
  if (!allowed.has(z.data.url)) return null;

  // 寮哄埗涓枃杈撳嚭锛氶櫎鏍囬澶栧繀椤诲惈涓枃锛堟爣棰樺彲涓哄師鏂囪嫳鏂囷級
  if (
    !hasChinese(z.data.title) ||
    !hasChinese(z.data.event_one_liner) ||
    !hasChinese(z.data.news_brief) ||
    !hasChinese(z.data.why_it_matters) ||
    !hasChinese(z.data.bd_angle)
  ) {
    return null;
  }

    return z.data;
  } catch (e: any) {
    console.error(`[llm] fetch failed: ${String(e?.message || e)}`);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function safeJsonParse(s: string): any | null {
  try {
    // 鏈変簺妯″瀷浼氬寘 ```json ... ```锛岃繖閲屽墺绂?
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

function normalizeBaseUrl(raw: string) {
  const base = raw.replace(/\/$/, "");
  if (
    base.startsWith("https://generativelanguage.googleapis.com/v1beta") &&
    !base.includes("/openai")
  ) {
    return `${base}/openai`;
  }
  return base;
}

