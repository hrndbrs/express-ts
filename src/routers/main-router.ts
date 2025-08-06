import express from "express";
import { AppRouter } from "../lib/types/app-type";

export default class MainRouter extends AppRouter {
  protected _path = "/api";
  declare protected _controllers;
  declare protected _router;

  constructor(...subRouters: AppRouter[]) {
    super();

    this._router = express.Router();
    this._subRouters = subRouters;

    this.init();
  }

  protected init() {
    for (const r of this._subRouters) {
      this.router.use(r.path, r.router);
    }
  }
}
