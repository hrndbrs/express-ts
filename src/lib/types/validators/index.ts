import { ClientError } from "../../exceptions";
import { HttpStatusCode } from "../http-type";

import type { infer as zInfer, ZodType } from "zod";

type SchemaMap = Record<string, ZodType>;

export abstract class BaseValidator<S extends SchemaMap> {
  protected abstract _schemas: S;

  validate<K extends keyof S>(input: unknown, key: K): zInfer<S[K]> {
    const schema = this._schemas[key];
    const result = schema.safeParse(input);

    if (result.success) return result.data;

    const message = result.error.issues.map((issue) => issue.message).join(";");
    throw new ClientError(message, HttpStatusCode.BadRequest);
  }
}

export * from "./auth-validator-type";
