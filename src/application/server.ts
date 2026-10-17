import express from "express";
import { v4 as uuidv4 } from "uuid";

import type {
  AppRouter,
  HandlerFunction,
  Logger,
  Middleware,
  ServerConfig,
} from "../lib/interfaces";

export const web = express();

export default class Server {
  private _app: express.Express;
  private _logger: Logger;

  get app() {
    return this._app;
  }

  constructor({ logger }: ServerConfig) {
    this._app = express();
    this._logger = logger;

    this._init();
  }

  private _init() {
    this.app.use(this._setRequestLogger);
  }

  public addMiddlewares(...middlewares: Middleware[]) {
    for (const m of middlewares) {
      this.app.use(m);
    }
  }

  public registerRoutes(...routers: AppRouter[]) {
    for (const r of routers) {
      this.app.use(r.path, r.router);
    }
  }

  private _setRequestLogger: HandlerFunction = (req, res, next) => {
    const requestId = uuidv4();
    const childLogger = this._logger.child({
      requestId,
      method: req.method,
      path: req.url,
    });

    const profiler = childLogger.startTimer();

    req.logger = childLogger;
    req.requestId = requestId;

    childLogger.info({
      ip: req.ip,
      userAgent: req.headers.userAgent,
    });

    res.on("finish", () => {
      profiler.done({
        statusCode: res.statusCode,
      });
    });

    next();
  };

  run(port: number = 3000) {
    this.app.listen(port, () => {
      this._logger.info(`Running on port: ${port}`);
    });
  }
}
