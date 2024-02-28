import { prismaClient } from "../application/db";
import { ClientError } from "../lib/exceptions";
import { generateToken } from "../lib/jwt";
import {
  CreateUserRequest,
  LoginUserRequest,
  UserResponse,
  toUserResponse,
} from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, request);

    const existingUser = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (!!existingUser) {
      throw new ClientError("username already exists", 400);
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new ClientError("Username/Password is incorrect", 400);
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

    if (!isPasswordValid) {
      throw new ClientError("Username/Password is incorrect", 400);
    }

    const token = generateToken(user.username);

    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token,
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;

    return response;
  }
}
