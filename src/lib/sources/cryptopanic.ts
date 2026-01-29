const TIMEOUT_MS = 12_000;

export type CryptoPanicItem = {
  url: string;
  title: string;
  source_name: string;
  published_time_utc: string;
};

export async function fetchCryptoPanicLinks(): Promise<{
  items: CryptoPanicItem[];
  note: string | null;
}> {
  const token = (process.env.CRYPTOPANIC_TOKEN || "").trim();
  if (!token) {
    return {
      items: [],
      note: "CryptoPanic token missing; supplement links disabled.",
    };
  }

  const url =
    `https://cryptopanic.com/api/v1/posts/` +
    `?auth_token=${encodeURIComponent(token)}` +
    `&public=true` +
    `&kind=news`;

  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: ac.signal, cache: "no-store" });
    if (!res.ok) {
      return {
        items: [],
        note: `CryptoPanic HTTP ${res.status}`,
      };
    }
    const data: any = await res.json();
    const results: any[] = data?.results || data?.posts || [];

    const items: CryptoPanicItem[] = results
      .map((r) => {
        const link = String(r?.url || r?.domain || "").trim();
        if (!link) return null;
        const title = String(r?.title || "").trim();
        const source_name =
          String(r?.source?.title || r?.source?.domain || r?.source || "").trim() ||
          "unknown";
        const published_time_utc = String(
          r?.published_at || r?.published_time || r?.created_at || ""
        ).trim();

        return {
          url: link,
          title,
          source_name,
          published_time_utc,
        };
      })
      .filter(Boolean) as CryptoPanicItem[];

    return { items: items.slice(0, 20), note: null };
  } catch (e: any) {
    return {
      items: [],
      note: `CryptoPanic error: ${String(e?.message || e)}`,
    };
  } finally {
    clearTimeout(t);
  }
}
