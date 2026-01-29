const STOP = new Set([
  "the","a","an","and","or","to","of","in","on","for","with","as","by","at","from",
  "is","are","was","were","be","been","being","it","this","that","these","those",
  "will","may","might","can","could","should","would","about","into","over","under",
  "after","before","between","during","than","then","also"
]);

export function normalizeTitle(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim();
}

export function tokenize(s: string): string[] {
  const raw = (s || "").toLowerCase();
  // 简化：按字母数字切分（多语种会弱一些，但 MVP 可跑）
  const parts = raw.split(/[^a-z0-9]+/g).filter(Boolean);
  return parts.filter(t => t.length >= 3 && !STOP.has(t));
}

export function pickTopKeywords(freq: Map<string, number>, n: number): string[] {
  return Array.from(freq.entries())
    .sort((a,b) => b[1]-a[1])
    .slice(0, n)
    .map(([k]) => k);
}
