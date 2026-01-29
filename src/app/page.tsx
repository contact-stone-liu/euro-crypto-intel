import { cache } from "react";
import { prisma } from "@/lib/db/client";
import type { TopicCard } from "@/lib/types/topicCard";
import RefreshPanel from "@/app/components/RefreshPanel";

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
  // 最新一次刷新（可能失败）+ 最近一次成功数据（用于展示）
  const { latestAny, latestOk } = await getPageData();

  const statusTime = latestAny?.createdAtUtc
    ? latestAny.createdAtUtc.toISOString()
    : null;
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

  const showTime = latestOk?.createdAtUtc
    ? latestOk.createdAtUtc.toISOString()
    : null;

  const supplement = safeParseJson<{ items?: any[]; note?: string | null }>(
    latestOk?.supplementLinksText ?? null,
    {}
  );
  const supplementItems = Array.isArray(supplement?.items)
    ? supplement.items
    : [];
  const supplementNote = supplement?.note || null;

  return (
    <main className="page">
      <header className="hero">
        <div className="hero-title">欧洲媒体视角：日更加密情报看板</div>
        <div className="hero-stats">
          <div>
            <div className="stat-label">当前展示批次（UTC）</div>
            <div className="stat-value">{showTime ?? "暂无"}</div>
          </div>
          <div>
            <div className="stat-label">状态</div>
            <div className="stat-value">
              {statusRunning ? "刷新中" : statusFailed ? "失败" : "正常"}
            </div>
          </div>
        </div>
        {statusRunning && statusTime ? (
          <div className="hero-tip info">
            最近一次刷新进行中，请稍后再看。
          </div>
        ) : null}
        {statusFailed && statusTime ? (
          <div className="hero-tip error">
            最近一次刷新失败，展示上次成功结果。
            {statusErrorDisplay ? (
              <span suppressHydrationWarning>{` 错误：${statusErrorDisplay}`}</span>
            ) : null}
          </div>
        ) : null}
        {!showTime ? (
          <div className="hero-tip warn">
            还没有成功数据。请先访问：<a href="/api/refresh">/api/refresh</a>
            （本地请加 <code>?secret=你的secret</code>）触发一次刷新。
          </div>
        ) : null}
      </header>

      <RefreshPanel />

      <div className="card-grid">
        {cards.slice(0, 5).map((c, idx) => (
          <section key={idx} className="card">
            <div className="card-head">
              <div className="card-title">
                <span className="card-rank">{idx + 1}</span>
                {c.title}
              </div>
              <div className="card-cat">{c.category}</div>
            </div>

            <div className="card-row">
              <span className="card-label">TL;DR</span>
              <span>{c.tldr}</span>
            </div>
            <div className="card-row">
              <span className="card-label">新闻简述</span>
              <span>{c.news_brief || c.tldr}</span>
            </div>
            <div className="card-row">
              <span className="card-label">BD影响</span>
              <span>{c.bd_impact}</span>
            </div>
            <div className="card-row">
              <span className="card-label">关键实体</span>
              <span>{(c.entities || []).join("、") || "—"}</span>
            </div>

            <div className="card-row">
              <span className="card-label">证据链接</span>
              <ol className="card-evidence">
                {(c.evidence || []).slice(0, 3).map((e, i) => (
                  <li key={i}>
                    <a href={e.url} target="_blank" rel="noreferrer">
                      {e.source_name}
                    </a>
                    <span className="card-time">
                      （{e.published_time_utc} UTC）
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card-foot">
              覆盖：{c.volume_signals?.article_count ?? 0} 篇 /{" "}
              {c.volume_signals?.unique_source_count ?? 0} 来源；最后出现：
              {c.volume_signals?.last_seen_utc ?? "—"}；置信度：
              {c.confidence}
            </div>
          </section>
        ))}
      </div>

      <section className="panel">
        <div className="panel-title">补源链接（CryptoPanic）</div>
        {supplementItems.length === 0 ? (
          <div className="panel-desc">
            暂无补源链接（可能未配置 CRYPTOPANIC_TOKEN）。
          </div>
        ) : (
          <ol className="panel-list">
            {supplementItems.slice(0, 10).map((e: any, i: number) => (
              <li key={i}>
                <a href={e.url} target="_blank" rel="noreferrer">
                  {e.source_name || e.title || "source"}
                </a>
                <span className="card-time">
                  {e.published_time_utc ? `（${e.published_time_utc} UTC）` : ""}
                </span>
              </li>
            ))}
          </ol>
        )}
        {supplementNote ? <div className="panel-meta">{supplementNote}</div> : null}
      </section>
    </main>
  );
}
