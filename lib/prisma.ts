import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

// Standard Next.js singleton pattern: in dev, Next's hot-reload would
// otherwise create a new PrismaClient (and a new DB connection pool) on
// every file save. Reuse one instance via a global.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma 7's client generator requires an explicit driver adapter rather
// than reading DATABASE_URL implicitly.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
