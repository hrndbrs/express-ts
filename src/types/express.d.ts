declare namespace Express {
  interface Request {
    logger: import("../lib/interfaces").Logger;
    requestId: string;
    local?: unknown;
  }
}
