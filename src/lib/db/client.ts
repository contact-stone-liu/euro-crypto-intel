// src/lib/db/client.ts
import { existsSync } from "node:fs";
import { join } from "node:path";

const isPostgres = (process.env.DATABASE_URL || "").startsWith("postgres");
const projectRoot = process.cwd();
const generatedDir = join(projectRoot, "src", "lib", "db", "generated");
const postgresClientPath = join(generatedDir, "postgres");
const sqliteClientPath = join(generatedDir, "sqlite");

// Avoid bundler static resolution on missing postgres client.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const lazyRequire = (p: string) => (eval("require") as NodeRequire)(p);
const PrismaClient = (
  isPostgres && existsSync(postgresClientPath)
    ? lazyRequire(postgresClientPath)
    : lazyRequire(sqliteClientPath)
).PrismaClient as typeof import("./generated/sqlite").PrismaClient;

type PrismaClientType = InstanceType<typeof PrismaClient>;

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClientType | undefined;
}

export const prisma =
  global.__prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}

