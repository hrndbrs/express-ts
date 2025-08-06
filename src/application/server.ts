import express from "express";

import type { AppRouter } from "../lib/types/app-type";

import type {
  ServerConfig,
  Logger,
  Middleware,
  ErrorMiddleware,
} from "../lib/types/app-type";

export const web = express();

export default class Server {
  private _app: express.Express;
  private _logger: Logger;
  private _middlewares: Middleware[];
  private _routers: AppRouter[];
  private _errorHandler: ErrorMiddleware;

  get app() {
    return this._app;
  }

  constructor({ logger, middlewares, routers, errorHandler }: ServerConfig) {
    this._app = express();
    this._logger = logger;
    this._middlewares = middlewares;
    this._routers = routers;
    this._errorHandler = errorHandler;
  }

  private _setMiddleware(...middlewares: Middleware[]) {
    for (const m of middlewares) {
      this.app.use(m);
    }
  }

  private _registerRoutes(...routers: AppRouter[]) {
    for (const r of routers) {
      this.app.use(r.path, r.router);
    }
  }

  run(port: number = 3000) {
    this._setMiddleware(...this._middlewares);
    this._registerRoutes(...this._routers);
    this._setMiddleware(this._errorHandler);

    this.app.listen(port, () => {
      this._logger.info(`Running on port: ${port}`);
    });
  }
}
