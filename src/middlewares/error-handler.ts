import { Response, Request, NextFunction } from "express";
import { ClientError } from "../lib/exceptions";
import { ZodError } from "zod";

export const errorHandler = async (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: error.errors.map((e) => e.message),
    });
  } else if (error instanceof ClientError) {
    res.status(error.statusCode).json({
      error: error.message,
    });
  } else {
    res.status(500).json({
      error: error.message,
    });
  }
};
