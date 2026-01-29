import { z } from "zod";

export const Severity = z.enum(["高", "中", "低"]);
export const ImpactLabel = z.enum([
  "强负面",
  "负面",
  "中性",
  "正面",
  "强正面",
]);

export const FetchStatus = z.enum([
  "ok",
  "forbidden",
  "timeout",
  "no_content",
  "error",
]);

export const TopicCardSchema = z.object({
  title: z.string().min(1).max(200),
  original_title: z.string().min(1).max(400).optional(),
  source_name: z.string().min(1).max(60),
  source_region: z.string().min(1).max(30).optional(),
  published_time: z.string().min(1).max(40),
  source_note: z.string().max(30).optional(),
  url: z.string().url(),

  event_one_liner: z.string().min(1).max(60),
  news_brief: z.string().min(1).max(100),
  impact_axis: z.enum(["注册", "入金", "交易"]),
  severity: Severity,
  impact_register: ImpactLabel,
  impact_deposit: ImpactLabel,
  impact_trading: ImpactLabel,
  why_it_matters: z.string().min(1).max(90),
  bd_angle: z.string().min(1).max(90),
  evidence_points: z.array(z.string().min(1).max(25)).min(1).max(3).optional(),
  evidence: z
    .array(
      z.object({
        text: z.string().min(1).max(60),
        url: z.string().url(),
        source_name: z.string().max(80).optional(),
      })
    )
    .min(0)
    .max(3)
    .optional(),
  evidence_note: z.string().max(120).optional(),
  fetch_status: FetchStatus.optional(),
  fetch_error: z.string().max(200).optional(),
  needs_review: z.boolean().optional(),

  entities: z.array(z.string()).max(5),
  volume_signals: z.object({
    article_count: z.number().int().nonnegative(),
    unique_source_count: z.number().int().nonnegative(),
    last_seen_utc: z.string().datetime(),
  }),
  confidence: z.enum(["高", "中", "低"]),
  batch_id: z.string().min(1),
});

export type TopicCard = z.infer<typeof TopicCardSchema>;
