// This file initializes and exports a shared Prisma Client instance for database access.
// It prevents creating multiple Prisma instances in development and is reused across the whole application.
// It belongs to the data access layer used by API routes and server components that work with courses and registrations.

import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `globalThis` object in development to prevent
// exhausting your database connection limit on hot reloads.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
