import { spawnSync } from "node:child_process";

const url = process.env.DATABASE_URL || "";
const isPostgres = url.startsWith("postgres://") || url.startsWith("postgresql://");
const schema = isPostgres ? "prisma/postgres/schema.prisma" : "prisma/sqlite/schema.prisma";

console.log(`[db-push] DATABASE_URL dialect = ${isPostgres ? "postgres" : "sqlite"}`);
console.log(`[db-push] using schema = ${schema}`);

const r = spawnSync(
  "npx",
  ["prisma", "db", "push", "--schema", schema],
  { stdio: "inherit", shell: true }
);

if (r.status !== 0) {
  console.error("[db-push] failed");
  process.exit(r.status ?? 1);
}

const g = spawnSync(
  "npx",
  ["prisma", "generate", "--schema", schema],
  { stdio: "inherit", shell: true }
);

if (g.status !== 0) {
  console.error("[db-push] prisma generate failed");
  process.exit(g.status ?? 1);
}

console.log("[db-push] done");
