export type HealthResponse = {
  status: "ok" | "error";
  database: "up" | "down";
  uptime: number;
  timestamp: string;
};
