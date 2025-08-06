import { TokenManager, PasswordUtils } from "../src/lib/utils";
import type { DB } from "../src/lib/types/app-type";

type Utils = {
  tokenManager: TokenManager;
  password: PasswordUtils;
};

export class UserTest {
  readonly db: DB;
  readonly utils: Utils;
  readonly mockUser = {
    username: "test_username",
    name: "test_name",
    password: "test_password",
  };

  constructor(db: DB) {
    this.db = db;
    this.utils = {
      password: new PasswordUtils(),
      tokenManager: new TokenManager(),
    };
  }

  async delete() {
    await this.db.user.deleteMany({
      where: {
        username: this.mockUser.username,
      },
    });
  }

  async create() {
    const { username, name, password } = this.mockUser;

    await this.db.user.create({
      data: {
        username,
        name,
        password: await this.utils.password.hash(password),
        token: this.utils.tokenManager.sign(username),
      },
    });
  }
}
