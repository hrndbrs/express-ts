/// <reference types="node" />
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // process.env instead of env() so `prisma generate` works without a DATABASE_URL (e.g. fresh clone / CI build)
    url: process.env.DATABASE_URL,
  },
});
