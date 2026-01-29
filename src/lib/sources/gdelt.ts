const TIMEOUT_MS = 25_000;

export type GdeltArticle = {
  url: string;
  title?: string;
  excerpt?: string;
  domain?: string;
  language?: string;
  sourceCountry?: string;
  sourcecountry?: string;
  seendate?: string;
  [key: string]: any;
};

export function toGdeltDatetimeUtc(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds())
  );
}

export function parseGdeltSeenDateUtc(s?: string | null): Date | null {
  if (!s) return null;
  const m = s.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/);
  if (!m) return null;
  const [, Y, M, D, h, m2, sec] = m;
  return new Date(Date.UTC(+Y, +M - 1, +D, +h, +m2, +sec));
}

export function canonicalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    u.search = "";
    return u.toString().trim().toLowerCase();
  } catch {
    return (url || "").trim().toLowerCase();
  }
}

export function normalizeGdeltQuery(raw: string): string {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";
  const hasOr = /\bOR\b/i.test(trimmed);
  if (hasOr && !(trimmed.startsWith("(") && trimmed.endsWith(")"))) {
    return `(${trimmed})`;
  }
  return trimmed;
}

async function fetchJsonWithTimeout(url: string) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: ac.signal,
      headers: { "user-agent": "euro-crypto-intel/1.0" },
      cache: "no-store",
    });

    const ct = res.headers.get("content-type") || "";
    const text = await res.text();

    if (!res.ok) {
      throw new Error(
        `GDELT HTTP ${res.status} ${res.statusText} | content-type=${ct} | body=${text.slice(
          0,
          200
        )} | url=${url}`
      );
    }

    try {
      return JSON.parse(text);
    } catch {
      throw new Error(
        `GDELT returned non-JSON | content-type=${ct} | body=${text.slice(
          0,
          200
        )} | url=${url}`
      );
    }
  } finally {
    clearTimeout(t);
  }
}

export async function fetchGdeltArticles(opts: {
  rawQuery: string;
  start: Date;
  end: Date;
  maxrecords?: number;
  sort?: "HybridRel" | "DateDesc";
}) {
  const raw = normalizeGdeltQuery(opts.rawQuery);
  const query = encodeURIComponent(raw);
  const startdatetime = toGdeltDatetimeUtc(opts.start);
  const enddatetime = toGdeltDatetimeUtc(opts.end);
  const maxrecords = opts.maxrecords ?? 250;
  const sort = opts.sort ?? "HybridRel";

  const gdeltUrl =
    `https://api.gdeltproject.org/api/v2/doc/doc` +
    `?query=${query}` +
    `&mode=ArtList` +
    `&format=json` +
    `&maxrecords=${maxrecords}` +
    `&sort=${sort}` +
    `&startdatetime=${startdatetime}` +
    `&enddatetime=${enddatetime}`;

  const data = await fetchJsonWithTimeout(gdeltUrl);
  const articles: GdeltArticle[] =
    (data?.articles as GdeltArticle[]) ||
    (data?.result?.articles as GdeltArticle[]) ||
    [];

  return { gdeltUrl, rawQuery: raw, articles, startdatetime, enddatetime };
}
