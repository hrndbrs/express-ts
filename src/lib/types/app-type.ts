import type { Router } from "express";
import type { RequestHandler, ErrorRequestHandler } from "express";
import type { Logger as LOGGER } from "winston";
import type { PrismaClient } from "../../generated/prisma/client";

export abstract class AppService {
  protected _db: DB;

  constructor(db: DB) {
    this._db = db;
  }

  get db() {
    return this._db;
  }
}

export abstract class AppController {
  protected abstract _services: Record<string, AppService>;
}

export abstract class AppRouter {
  protected abstract _path: string;
  protected abstract _router: Router;
  protected abstract _controllers: Record<string, AppController>;

  protected _subRouters: AppRouter[] = [];

  get router() {
    return this._router;
  }

  get path() {
    return this._path;
  }

  protected abstract init(): void;
}

export type DB = PrismaClient;

export type ErrorMiddleware = ErrorRequestHandler;
export type HandlerFunction = RequestHandler;
export type Middleware = ErrorMiddleware | HandlerFunction;

export type Logger = LOGGER;

export type ServerConfig = {
  logger: Logger;
  middlewares: Middleware[];
  routers: AppRouter[];
  errorHandler: ErrorMiddleware;
};
