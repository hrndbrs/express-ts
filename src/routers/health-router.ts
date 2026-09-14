import express from "express";
import { AppRouter } from "../lib/types/app-type";

import type { HealthController } from "../controllers";

type Controllers = {
  health: HealthController;
};

export default class HealthRouter extends AppRouter {
  protected _path = "/health";
  declare protected _router;

  constructor(protected _controllers: Controllers) {
    super();

    this._router = express.Router();
    this.init();
  }

  protected init() {
    this.router.get("/", this._controllers.health.check);
  }
}
