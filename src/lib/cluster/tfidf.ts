import { tokenize } from "@/lib/utils/text";

export type Doc = {
  id: string;
  text: string;
};

export type TfIdf = {
  vocab: string[];
  vectors: number[][]; // L2 normalized
};

export function buildTfIdf(docs: Doc[]): TfIdf {
  const N = docs.length;

  const docTokens: string[][] = docs.map(d => tokenize(d.text));
  const df = new Map<string, number>();
  for (const toks of docTokens) {
    const seen = new Set(toks);
    for (const t of seen) df.set(t, (df.get(t) || 0) + 1);
  }

  // 过滤：至少出现在2篇文档里（更稳，减少噪音）；若过滤后为空，则退化为不过滤
  let vocab = Array.from(df.entries())
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t);

  if (vocab.length === 0) {
    vocab = Array.from(df.keys());
  }

  // 限制维度：最多 2000 词
  vocab = vocab.slice(0, 2000);

  const idf = new Map<string, number>();
  for (const t of vocab) {
    const dfi = df.get(t) || 0;
    idf.set(t, Math.log((N + 1) / (dfi + 1)) + 1);
  }

  const index = new Map<string, number>();
  vocab.forEach((t, i) => index.set(t, i));

  const vectors = docTokens.map((toks) => {
    const tf = new Map<string, number>();
    for (const t of toks) {
      if (index.has(t)) tf.set(t, (tf.get(t) || 0) + 1);
    }
    const v = new Array(vocab.length).fill(0);
    for (const [t, c] of tf.entries()) {
      const i = index.get(t)!;
      v[i] = c * (idf.get(t) || 1);
    }
    // L2 normalize
    const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
    return v.map((x) => x / norm);
  });

  return { vocab, vectors };
}

export function cosine(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}
