import { AppRouter } from "../lib/interfaces";

import type { HealthController } from "../controllers";

type Controllers = {
  health: HealthController;
};

export default class HealthRouter extends AppRouter {
  protected _path = "/health";

  constructor(protected _controllers: Controllers) {
    super();
    this._init();
  }

  private _init() {
    this.router.get("/", this._controllers.health.check);
  }
}
