import type { HttpStatusCode } from "./types/http-type";

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
