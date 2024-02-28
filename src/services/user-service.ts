import { prismaClient } from "../application/db";
import { ClientError } from "../exceptions";
import { CreateUserRequest, UserResponse, toUserResponse } from "../models/user-model";
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
}
