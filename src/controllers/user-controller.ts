import {
  AppController,
  HttpStatusCode,
  type HandlerFunction,
} from "../lib/interfaces";
import type { UserService } from "../services";
import type { AuthValidator } from "../lib/validators";

type Services = {
  user: UserService;
};

type Validators = {
  auth: AuthValidator;
};

type Config = {
  services: Services;
  validators: Validators;
};

export default class UserController extends AppController {
  declare protected _services: Services;
  private _validators: Validators;

  constructor({ services, validators }: Config) {
    super();
    this._services = services;
    this._validators = validators;
  }

  register: HandlerFunction = async (req, res, next) => {
    try {
      const payload = this._validators.auth.validate(req.body, "register");

      const response = await this._services.user.register(payload);

      res.status(HttpStatusCode.Created).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  };

  login: HandlerFunction = async (req, res, next) => {
    try {
      const payload = this._validators.auth.validate(req.body, "login");
      const response = await this._services.user.login(payload);

      res.status(HttpStatusCode.OK).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  };
}
