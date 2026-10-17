import winston from "winston";

import type { Logger } from "../lib/interfaces";

export default function createLogger(): Logger {
  return winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.prettyPrint(),
    ),
    transports: [
      new winston.transports.Console({
        level: process.env.NODE_ENV === "production" ? "warn" : "debug",
      }),
      new winston.transports.File({
        level: "info",
        filename: "dist/server.log",
      }),
    ],
  });
}
