import express from "express";
import { AppRouter } from "../lib/types/app-type";

import type { UserController } from "../controllers";

type Controllers = {
  user: UserController;
};

export default class UserRouter extends AppRouter {
  protected _path = "/user";
  declare protected _router;

  constructor(protected _controllers: Controllers) {
    super();

    this._router = express.Router();
    this.init();
  }

  protected init() {
    this.router.post("/register", this._controllers.user.register);
    this.router.post("/login", this._controllers.user.login);
  }
}
