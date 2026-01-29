import { z } from "zod";

export const Category = z.enum([
  "监管与合规",
  "执法与诉讼",
  "交易所与产品",
  "稳定币与支付通道",
  "机构与ETF",
  "安全与黑客",
  "税务与银行",
  "市场与宏观叙事",
]);

export const Confidence = z.enum(["高", "中", "低"]);

export const ChainDimensions = [
  "获客/广告",
  "KOL内容尺度",
  "入金/出金",
  "衍生品/合约",
  "合规审核",
  "竞争对手叙事",
  "用户风险教育",
] as const;

export const TopicCardSchema = z.object({
  title: z.string().min(1).max(14),
  category: Category,
  tldr: z.string().min(1).max(90),
  bd_impact: z
    .string()
    .min(1)
    .max(80)
    .refine(
      (s) => ChainDimensions.some((k) => s.includes(k)),
      "bd_impact must include chain dimension keyword"
    ),
  entities: z.array(z.string()).max(5),
  evidence: z.array(z.object({
    url: z.string().url(),
    source_name: z.string().min(1),
    published_time_utc: z.string().datetime()
  })).length(3),
  volume_signals: z.object({
    article_count: z.number().int().nonnegative(),
    unique_source_count: z.number().int().nonnegative(),
    last_seen_utc: z.string().datetime()
  }),
  confidence: Confidence,
  batch_id: z.string().min(1)
});

export type TopicCard = z.infer<typeof TopicCardSchema>;
