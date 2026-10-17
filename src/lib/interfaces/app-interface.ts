import type { PrismaClient } from "../../generated/prisma/client";

import type { ErrorRequestHandler, RequestHandler, Router } from "express";
import express from "express";
import type { Logger as LOGGER } from "winston";

export abstract class AppService {
  constructor(protected _db: DB) {}

  get db() {
    return this._db;
  }
}

export abstract class AppController {
  protected abstract _services: Record<string, AppService>;
}

export abstract class AppRouter {
  protected abstract _path: string;
  protected abstract _controllers: Record<string, AppController>;
  protected _router: Router;

  constructor() {
    this._router = express.Router();
  }

  public addSubRouters(...subRouters: AppRouter[]) {
    for (const r of subRouters) {
      this.router.use(r.path, r.router);
    }
  }

  public addMiddlewares(...middlewares: Middleware[]) {
    for (const m of middlewares) {
      this.router.use(m);
    }
  }

  get router() {
    return this._router;
  }

  get path() {
    return this._path;
  }
}

export type DB = PrismaClient;

export type ErrorMiddleware = ErrorRequestHandler;
export type HandlerFunction = RequestHandler;
export type Middleware = ErrorMiddleware | HandlerFunction;

export type Logger = LOGGER;

export type ServerConfig = {
  logger: Logger;
};
