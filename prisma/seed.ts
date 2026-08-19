// Creates the first dashboard login (an ADMIN account) so the site isn't
// locked out of its own /dashboard on a fresh database. Run with:
//   pnpm db:seed
// Reads SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD / SEED_ADMIN_NAME from .env —
// safe to re-run, it skips creating the user if that email already exists.
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { hashPassword } from "../lib/auth/password";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME ?? "Admin";

  if (!email || !password) {
    throw new Error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in your .env before running the seed script (see .env.example).",
    );
  }

  const existing = await prisma.staffUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`Staff user "${email}" already exists — nothing to do.`);
    return;
  }

  const passwordHash = await hashPassword(password);
  await prisma.staffUser.create({
    data: { name, email, passwordHash, role: "ADMIN", active: true },
  });

  console.log(`Created initial ADMIN user: ${email}`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
