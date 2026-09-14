import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

import type { DB, Logger } from "../lib/types/app-type";

export default function getDB(logger: Logger): DB {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  // The MariaDB driver adapter is Prisma's adapter for MySQL; it accepts mysql:// URLs.
  const adapter = new PrismaMariaDb(databaseUrl);

  const prismaClient = new PrismaClient({
    adapter,
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "event",
        level: "error",
      },
      {
        emit: "event",
        level: "info",
      },
      {
        emit: "event",
        level: "warn",
      },
    ],
  });

  prismaClient.$on("query", (e) => {
    logger.info(e);
  });

  prismaClient.$on("error", (e) => {
    logger.error(e);
  });

  prismaClient.$on("info", (e) => {
    logger.info(e);
  });

  prismaClient.$on("warn", (e) => {
    logger.warn(e);
  });

  return prismaClient;
}
