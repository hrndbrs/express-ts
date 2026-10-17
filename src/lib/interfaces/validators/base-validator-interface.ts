import type { ZodType, infer as zInfer } from "zod";
import { ClientError } from "../exceptions-interface";
import { HttpStatusCode } from "../http-interface";

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
