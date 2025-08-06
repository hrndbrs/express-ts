import { PrismaClient } from "@prisma/client";

import type { DB, Logger } from "../lib/types/app-type";

export default function getDB(logger: Logger): DB {
  const prismaClient = new PrismaClient({
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
