import { AppRouter } from "../lib/interfaces";

import type { UserController } from "../controllers";

type Controllers = {
  user: UserController;
};

export default class UserRouter extends AppRouter {
  protected _path = "/users";
  declare protected _router;

  constructor(protected _controllers: Controllers) {
    super();
    this._init();
  }

  private _init() {
    this.router.post("/", this._controllers.user.register);
    this.router.post("/login", this._controllers.user.login);
  }
}
