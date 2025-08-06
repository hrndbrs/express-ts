import winston from "winston";

export default function createLogger() {
  return winston.createLogger({
    level: "debug",
    format: winston.format.json(),
    transports: [new winston.transports.Console({})],
  });
}
