// This file initializes and exports a shared Prisma Client instance for database access.
// It prevents creating multiple Prisma instances in development and is reused across the whole application.
// It belongs to the data access layer used by API routes and server components that work with courses and registrations.

// ============================
// Imports
// ============================
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// ============================
// Database logic (Prisma Client)
// ============================

// The Prisma Client is lazily initialized so that it only connects to the database
// when an API route is actually called at runtime — NOT during the Next.js build phase.
// This prevents the build from crashing when DATABASE_URL is not available at build time.

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  const client = new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

// Export a proxy so callers use `prisma.course.findMany()` etc. exactly as before,
// but the actual client is only created on first access at runtime.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    return (client as unknown as Record<string | symbol, unknown>)[prop];
  },
});
