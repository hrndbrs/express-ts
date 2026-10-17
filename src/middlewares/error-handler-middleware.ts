import {
  ClientError,
  type ErrorMiddleware,
  HttpStatusCode,
} from "../lib/interfaces";

export const globalErrorHandler: ErrorMiddleware = (error, req, res, _next) => {
  let statusCode = HttpStatusCode.InternalServerError;
  const message = error.message.split(";");

  if (error instanceof ClientError) {
    statusCode = error.statusCode;
  }

  const payload =
    message.length > 1 ? { errors: message } : { error: message[0] };

  req.logger.error({ message, stack: error.stack });

  res.status(statusCode).json(payload);
};
