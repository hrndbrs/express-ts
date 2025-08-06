import jwt from "jsonwebtoken";

export default class TokenManager {
  private readonly _secret = process.env.TOKEN_SECRET || "secret";

  sign(username: string) {
    return jwt.sign({ username }, this._secret);
  }

  validate(token: string) {
    return jwt.verify(token, this._secret);
  }
}
