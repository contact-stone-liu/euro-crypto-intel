import { cache } from "react";
import { prisma } from "@/lib/db/client";
import type { TopicCard } from "@/lib/types/topicCard";

export const dynamic = "force-dynamic";

function safeParseCard(raw: string): TopicCard | null {
  try {
    return JSON.parse(raw) as TopicCard;
  } catch {
    return null;
  }
}

function safeParseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

const getPageData = cache(async () => {
  const latestAny = await prisma.batch.findFirst({
    orderBy: { createdAtUtc: "desc" },
  });

  const latestOk = await prisma.batch.findFirst({
    where: { status: "success" },
    orderBy: { createdAtUtc: "desc" },
    include: { cards: { orderBy: { rank: "asc" } } },
  });

  return { latestAny, latestOk };
});

export default async function Page() {
  // 最新一次刷新（可能失败） + 最近一次成功的数据（用于展示）
  const { latestAny, latestOk } = await getPageData();

  const statusTime = latestAny?.createdAtUtc ? latestAny.createdAtUtc.toISOString() : null;
  const status = latestAny?.status ?? null;
  const statusRunning = status === "running" || latestAny?.error === "running";
  const statusFailed = status === "failed" && !statusRunning;
  const statusError = statusFailed ? latestAny?.error ?? null : null;
  const statusErrorDisplay = statusError
    ? `${statusError.slice(0, 300)}${statusError.length > 300 ? "…" : ""}`
    : null;

  let cards: TopicCard[] = [];
  if (latestOk?.cards?.length) {
    cards = latestOk.cards
      .map((t: any) => safeParseCard(t.cardJsonText))
      .filter((x): x is TopicCard => !!x);
  }

  const showTime = latestOk?.createdAtUtc ? latestOk.createdAtUtc.toISOString() : null;

  const supplement = safeParseJson<{ items?: any[]; note?: string | null }>(
    latestOk?.supplementLinksText ?? null,
    {}
  );
  const supplementItems = Array.isArray(supplement?.items) ? supplement.items : [];
  const supplementNote = supplement?.note || null;

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
        欧洲媒体视角：日更加密情报看板（Top5）
      </h1>

      <div style={{ fontSize: 14, color: "#444", marginBottom: 16 }}>
        <div>最近一次触发（UTC）：{statusTime ?? "暂无"}</div>
        {statusRunning && statusTime ? (
          <div style={{ marginTop: 6, color: "#2563eb" }}>
            最近一次刷新进行中，请稍后再看。
          </div>
        ) : null}

        {statusFailed && statusTime ? (
          <div style={{ marginTop: 6, color: "#b42318" }}>
            最近一次刷新失败，展示上次成功结果。
            {statusErrorDisplay ? (
              <span suppressHydrationWarning>{`错误：${statusErrorDisplay}`}</span>
            ) : null}
          </div>
        ) : null}

        <div style={{ marginTop: 6 }}>当前展示数据批次（UTC）：{showTime ?? "暂无"}</div>

        {!showTime ? (
          <div style={{ marginTop: 6 }}>
            还没有成功数据。请先访问：<a href="/api/refresh">/api/refresh</a>（本地请加
            <code>?secret=你的secret</code>）触发一次刷新。
          </div>
        ) : null}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        {cards.slice(0, 5).map((c, idx) => (
          <section
            key={idx}
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 14,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                {idx + 1}. {c.title}
              </div>
              <div style={{ fontSize: 12, color: "#555" }}>{c.category}</div>
            </div>

            <div style={{ marginTop: 8, fontSize: 14 }}>
              <b>TL;DR：</b>{c.tldr}
            </div>

            <div style={{ marginTop: 8, fontSize: 14 }}>
              <b>BD影响：</b>{c.bd_impact}
            </div>

            <div style={{ marginTop: 8, fontSize: 13 }}>
              <b>关键实体：</b>{(c.entities || []).join("、") || "—"}
            </div>

            <div style={{ marginTop: 8, fontSize: 13 }}>
              <b>证据链接：</b>
              <ol style={{ marginTop: 6, paddingLeft: 18 }}>
                {(c.evidence || []).slice(0, 3).map((e, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>
                    <a href={e.url} target="_blank" rel="noreferrer">
                      {e.source_name}
                    </a>{" "}
                    <span style={{ color: "#666" }}>（{e.published_time_utc} UTC）</span>
                  </li>
                ))}
              </ol>
            </div>

            <div style={{ marginTop: 8, fontSize: 12, color: "#555" }}>
              热度：{c.volume_signals?.article_count ?? 0} 篇 / {c.volume_signals?.unique_source_count ?? 0} 来源；
              最后出现：{c.volume_signals?.last_seen_utc ?? "—"}；置信度：{c.confidence}
            </div>
          </section>
        ))}
      </div>

      <section
        style={{
          marginTop: 18,
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 14,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
          补源链接（CryptoPanic）
        </div>
        {supplementItems.length === 0 ? (
          <div style={{ fontSize: 13, color: "#666" }}>
            暂无补源链接（可能未配置 CRYPTOPANIC_TOKEN）。
          </div>
        ) : (
          <ol style={{ marginTop: 6, paddingLeft: 18 }}>
            {supplementItems.slice(0, 10).map((e: any, i: number) => (
              <li key={i} style={{ marginBottom: 4 }}>
                <a href={e.url} target="_blank" rel="noreferrer">
                  {e.source_name || e.title || "source"}
                </a>{" "}
                <span style={{ color: "#666" }}>
                  {e.published_time_utc ? `（${e.published_time_utc} UTC）` : ""}
                </span>
              </li>
            ))}
          </ol>
        )}
        {supplementNote ? (
          <div style={{ marginTop: 6, fontSize: 12, color: "#666" }}>{supplementNote}</div>
        ) : null}
      </section>
    </main>
  );
}
