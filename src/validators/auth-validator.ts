import {
  registerSchema,
  loginSchema,
  BaseValidator,
} from "../lib/types/validators";

const schemas = {
  login: loginSchema,
  register: registerSchema,
} as const;

export default class AuthValidator extends BaseValidator<typeof schemas> {
  protected readonly _schemas = schemas;
}
