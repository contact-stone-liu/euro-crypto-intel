import { z } from "zod";

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

const IMPACT_RANGE_RE = /\d+\s*[-~]\s*\d+%/;

export const TopicCardSchema = z.object({
  title: z.string().min(1).max(30),
  category: z.string().min(1).max(30),
  news_brief: z.string().min(1).max(100),
  tldr: z.string().min(1).max(90),
  bd_impact: z
    .string()
    .min(1)
    .max(80)
    .refine(
      (s) => IMPACT_RANGE_RE.test(s),
      "bd_impact must include impact range like 10-30%"
    ),
  entities: z.array(z.string()).max(5),
  evidence: z
    .array(
      z.object({
        url: z.string().url(),
        source_name: z.string().min(1),
        published_time_utc: z.string().datetime(),
      })
    )
    .length(3),
  volume_signals: z.object({
    article_count: z.number().int().nonnegative(),
    unique_source_count: z.number().int().nonnegative(),
    last_seen_utc: z.string().datetime(),
  }),
  confidence: Confidence,
  batch_id: z.string().min(1),
});

export type TopicCard = z.infer<typeof TopicCardSchema>;
