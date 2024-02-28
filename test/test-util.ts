import bcrypt from "bcrypt";
import { prismaClient } from "../src/application/db";
import { generateToken } from "../src/lib/jwt";

export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: "test",
        name: "test",
        password: await bcrypt.hash("test", 10),
        token: generateToken("test"),
      },
    });
  }
}
