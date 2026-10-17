import {
  AppController,
  HttpStatusCode,
  type HandlerFunction,
} from "../lib/interfaces";
import type { HealthService } from "../services";

type Services = {
  health: HealthService;
};

type Config = {
  services: Services;
};

export default class HealthController extends AppController {
  declare protected _services: Services;

  constructor({ services }: Config) {
    super();
    this._services = services;
  }

  check: HandlerFunction = async (_req, res, next) => {
    try {
      const response = await this._services.health.check();

      const statusCode =
        response.status === "ok"
          ? HttpStatusCode.OK
          : HttpStatusCode.ServiceUnavailable;

      res.status(statusCode).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  };
}
