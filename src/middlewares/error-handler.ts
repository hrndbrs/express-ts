import { ClientError } from "../lib/exceptions";
import { HttpStatusCode } from "../lib/types/http-type";

import type { ErrorMiddleware } from "../lib/types/app-type";

export const errorHandler: ErrorMiddleware = async (
  error,
  _req,
  res,
  _next,
) => {
  let statusCode = HttpStatusCode.InternalServerError;
  const message = error.message.split(";");

  if (error instanceof ClientError) {
    statusCode = error.statusCode;
  }

  const payload =
    message.length > 1 ? { errors: message } : { error: message[0] };

  res.status(HttpStatusCode.InternalServerError).json(payload);
};
