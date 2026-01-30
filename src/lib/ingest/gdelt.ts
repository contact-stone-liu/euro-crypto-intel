import { toGdeltDateTime } from "@/lib/utils/time";

export type GdeltArticle = {
  url: string;
  title: string;
  excerpt?: string;
  source_name?: string;
  published_time_utc: string;
  language?: string;
  domain?: string;
};

function safeDomain(url: string): string | undefined {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

export async function fetchGdeltArticles(params: {
  query: string;
  startUtc: Date;
  endUtc: Date;
  maxRecords?: number;
}): Promise<GdeltArticle[]> {
  const { query, startUtc, endUtc } = params;
  const maxRecords = params.maxRecords ?? 250;

  const start = toGdeltDateTime(startUtc);
  const end = toGdeltDateTime(endUtc);

  const u = new URL("https://api.gdeltproject.org/api/v2/doc/doc");
  u.searchParams.set("query", query);
  u.searchParams.set("mode", "ArtList");
  u.searchParams.set("format", "json");
  u.searchParams.set("startdatetime", start);
  u.searchParams.set("enddatetime", end);
  u.searchParams.set("maxrecords", String(maxRecords));
  u.searchParams.set("sort", "HybridRel"); // 鍏奸【鏂伴矞搴?鐩稿叧鎬э紙MVP锛?
  u.searchParams.set("format", "json");

  const res = await fetch(u.toString(), { cache: "no-store" });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`GDELT璇锋眰澶辫触: ${res.status} ${t}`);
  }

  const json: any = await res.json();
  const list: any[] = json?.articles ?? [];

  return list
    .map((a) => {
      const url = a?.url;
      const title = a?.title;
      const seendate = a?.seendate; // 甯歌鏍煎紡锛?0260113094500
      const source = a?.sourceCountry || a?.source || a?.domain;
      const lang = a?.language;

      // seendate 杞?ISO
      let publishedIso = new Date().toISOString();
      if (typeof seendate === "string" && seendate.length >= 14) {
        const y = seendate.slice(0, 4);
        const m = seendate.slice(4, 6);
        const d = seendate.slice(6, 8);
        const hh = seendate.slice(8, 10);
        const mm = seendate.slice(10, 12);
        const ss = seendate.slice(12, 14);
        publishedIso = new Date(`${y}-${m}-${d}T${hh}:${mm}:${ss}Z`).toISOString();
      }

      return {
        url,
        title,
        excerpt: a?.socialimage ? undefined : a?.summary || a?.snippet, // GDELT瀛楁涓嶇ǔ瀹氾紝灏介噺鍏煎
        source_name: typeof source === "string" ? source : safeDomain(url),
        published_time_utc: publishedIso,
        language: lang,
        domain: safeDomain(url),
      } as GdeltArticle;
    })
    .filter((x) => x.url && x.title);
}

