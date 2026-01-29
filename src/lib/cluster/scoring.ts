import { hoursBetweenUtc } from "@/lib/utils/time";

export type ClusterSignals = {
  article_count: number;
  unique_source_count: number;
  last_seen_utc: Date;
};

export function recencyWeight(lastSeenUtc: Date, nowUtc: Date): number {
  // 越新权重越高；简单可解释：6小时衰减一次
  const h = hoursBetweenUtc(nowUtc, lastSeenUtc);
  return 1 / (1 + h / 6);
}

export function mvpScore(sig: ClusterSignals, nowUtc: Date): number {
  // MVP：score = article_count * ln(1+unique_source_count) * recency_weight
  // 直觉：转载刷屏往往“源少、量大”，ln(1+source) 让多来源更吃香；
  // 同时 recency 防止老新闻滞留。
  return sig.article_count * Math.log(1 + sig.unique_source_count) * recencyWeight(sig.last_seen_utc, nowUtc);
}

/**
 * 增强版（可选）思路（不阻塞 MVP）：
 * - 同源转载惩罚：同一个 domain 的文章占比越高，扣分越多
 * - 标题重复惩罚：高度相似标题越多，扣分越多
 * 为什么能避免转载刷屏：转载=同域/同标题的“复制粘贴”，惩罚会把它们的边际贡献压低。
 */
