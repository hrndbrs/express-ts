import { AppService } from "../lib/interfaces";
import type { HealthResponse } from "../lib/interfaces/DTO";

export default class HealthService extends AppService {
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
