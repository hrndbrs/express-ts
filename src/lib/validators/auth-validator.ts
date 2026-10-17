import {
  BaseValidator,
  loginSchema,
  registerSchema,
} from "../interfaces/validators";

const schemas = {
  login: loginSchema,
  register: registerSchema,
} as const;

export default class AuthValidator extends BaseValidator<typeof schemas> {
  protected readonly _schemas = schemas;
}
