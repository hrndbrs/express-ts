import {
  AppService,
  ClientError,
  HttpStatusCode,
  type DB,
} from "../lib/interfaces";
import type { LoginResponse, RegisterResponse } from "../lib/interfaces/DTO";
import type { LoginSchema, RegisterSchema } from "../lib/interfaces/validators";
import type { PasswordUtils, TokenManager } from "../lib/utils";

type Utils = {
  password: PasswordUtils;
  tokenManager: TokenManager;
};

type Config = {
  utils: Utils;
};

export default class UserService extends AppService {
  private readonly _utils: Utils;

  constructor(db: DB, { utils }: Config) {
    super(db);

    this._utils = utils;
  }

  async register(payload: RegisterSchema): Promise<RegisterResponse> {
    const existingUser = await this.db.user.count({
      where: {
        username: payload.username,
      },
    });

    if (existingUser) {
      throw new ClientError("username already exists", 400);
    }

    payload.password = await this._utils.password.hash(payload.password);

    const { username, name } = await this.db.user.create({
      data: payload,
    });

    return {
      username,
      name,
    };
  }

  async login(payload: LoginSchema): Promise<LoginResponse> {
    const user = await this.db.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (!user) {
      throw new ClientError(
        "Username/Password is incorrect",
        HttpStatusCode.BadRequest,
      );
    }

    const isPasswordValid = await this._utils.password.compare(
      payload.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ClientError(
        "Username/Password is incorrect",
        HttpStatusCode.BadRequest,
      );
    }

    const token = this._utils.tokenManager.sign(user.username);

    const { username, name } = await this.db.user.update({
      where: {
        username: payload.username,
      },
      data: {
        token,
      },
    });

    return {
      username,
      name,
      token,
    };
  }
}
