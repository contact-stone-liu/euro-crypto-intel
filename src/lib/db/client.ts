// src/lib/db/client.ts
const isPostgres = (process.env.DATABASE_URL || "").startsWith("postgres");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PrismaClient = (isPostgres
  ? require("./generated/postgres")
  : require("./generated/sqlite")
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
