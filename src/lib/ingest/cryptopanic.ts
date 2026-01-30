export type PanicLink = {
  title: string;
  url: string;
  source_name?: string;
  published_time_utc: string;
};

export async function fetchCryptoPanicLinks(params: {
  token?: string;
  limit?: number;
}): Promise<PanicLink[]> {
  const token = params.token?.trim();
  if (!token) return [];

  const limit = params.limit ?? 15;
  const u = new URL("https://cryptopanic.com/api/v1/posts/");
  u.searchParams.set("auth_token", token);
  u.searchParams.set("public", "true");
  u.searchParams.set("kind", "news");
  u.searchParams.set("regions", "en"); // MVP锛氬厛鐢ㄨ嫳鏂囧尯锛屽悗缁彲鎵╁璇?
  u.searchParams.set("filter", "hot");

  const res = await fetch(u.toString(), { cache: "no-store" });
  if (!res.ok) return [];

  const json: any = await res.json();
  const results: any[] = json?.results ?? [];
  return results.slice(0, limit).map(r => ({
    title: r?.title || "CryptoPanic",
    url: r?.url,
    source_name: r?.source?.title,
    published_time_utc: r?.published_at ? new Date(r.published_at).toISOString() : new Date().toISOString()
  })).filter(x => x.url);
}

