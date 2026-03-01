// This file configures Prisma for the project, pointing to the schema file.
// It belongs to the data access layer used by all API routes.

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
});
