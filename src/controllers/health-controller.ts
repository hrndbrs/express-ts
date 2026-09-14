import { AppController, type HandlerFunction } from "../lib/types/app-type";
import { HttpStatusCode } from "../lib/types/http-type";
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
