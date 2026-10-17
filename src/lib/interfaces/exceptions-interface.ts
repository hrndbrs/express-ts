import type { HttpStatusCode } from "./http-interface";

export class ClientError extends Error {
  constructor(
    message: string,
    private readonly _statusCode: HttpStatusCode,
  ) {
    super(message);
  }

  get statusCode() {
    return this._statusCode;
  }
}
