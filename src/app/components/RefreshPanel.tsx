"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type RefreshResult = {
  ok?: boolean;
  error?: string;
  batchId?: string;
  nowUtc?: string;
};

function safeParseJson(text: string): RefreshResult | null {
  try {
    return JSON.parse(text) as RefreshResult;
  } catch {
    return null;
  }
}

export default function RefreshPanel() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [last, setLast] = useState<RefreshResult | null>(null);
  const router = useRouter();

  const doRefresh = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const secret = process.env.NEXT_PUBLIC_REFRESH_SECRET || "";
      const url = secret ? `/api/refresh?secret=${encodeURIComponent(secret)}` : "/api/refresh";
      const res = await fetch(url, { method: "POST" });
      const text = await res.text();
      const data = safeParseJson(text);

      if (!data) {
        const hint = text.slice(0, 200).replace(/\s+/g, " ");
        setMsg(`刷新失败：${res.status} ${res.statusText}（返回非JSON） ${hint}`.trim());
        return;
      }

      setLast(data);
      if (data?.ok) {
        setMsg("刷新成功，正在更新页面数据...");
        router.refresh();
      } else {
        setMsg(`刷新失败：${data?.error || "unknown error"}`);
      }
    } catch (e: any) {
      setMsg(`刷新失败：${String(e?.message || e)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel">
      <div className="panel-title">立即刷新</div>
      <div className="panel-desc">
        点击按钮会抓取过去24小时新闻并生成 Top5 新闻卡片。
      </div>
      <div className="panel-row">
        <button className="panel-btn" onClick={doRefresh} disabled={loading}>
          {loading ? "刷新中..." : "点击刷新最新新闻"}
        </button>
      </div>
      {msg ? <div className="panel-msg">{msg}</div> : null}
      {last?.batchId ? (
        <div className="panel-meta">
          最近一次触发：{last.nowUtc || "—"} | batchId：{last.batchId}
        </div>
      ) : null}
    </section>
  );
}

