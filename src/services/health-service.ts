import { AppService, type DB } from "../lib/types/app-type";
import type { HealthResponse } from "../lib/types/DTO/healthdto-type";

type Config = {
  db: DB;
};

export default class HealthService extends AppService {
  constructor({ db }: Config) {
    super(db);
  }

  async check(): Promise<HealthResponse> {
    let database: HealthResponse["database"] = "up";

    try {
      await this.db.$queryRaw`SELECT 1`;
    } catch {
      database = "down";
    }

    return {
      status: database === "up" ? "ok" : "error",
      database,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
