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

// The Prisma Client is a type-safe database client automatically generated from schema.prisma.
// It is used by the application to perform reads and writes against the PostgreSQL database using simple,
// readable method calls (for example, prisma.course.findMany()) instead of raw SQL.
// For Prisma 7, we use the PostgreSQL adapter to connect to the database.

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Create a PostgreSQL connection pool using the DATABASE_URL from environment variables.
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { prisma };

