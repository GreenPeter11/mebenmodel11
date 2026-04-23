// This file initializes and exports a shared Prisma Client instance for database access.
// It prevents creating multiple Prisma instances in development and is reused across the whole application.
// It belongs to the data access layer used by API routes and server components that work with courses and registrations.

// ============================
// Imports
// ============================
import { PrismaClient } from "@prisma/client";

// ============================
// Database logic (Prisma Client)
// ============================

// The Prisma Client is a type-safe database client automatically generated from schema.prisma.
// It connects to the PostgreSQL database via the DATABASE_URL environment variable.
// It is reused across the application to avoid exhausting the connection pool.

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
