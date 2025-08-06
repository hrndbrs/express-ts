import express from "express";
import Server from "./application/server";

import { MainRouter, UserRouter } from "./routers";
import { UserController } from "./controllers";
import { UserService } from "./services";

import { AuthValidator } from "./validators";
import { PasswordUtils, TokenManager } from "./lib/utils";

import { errorHandler } from "./middlewares/error-handler";

import getDB from "./config/db";
import createLogger from "./config/logging";

export default function createServer() {
  const logger = createLogger();
  const db = getDB(logger);

  // Libs
  const authValidator = new AuthValidator();
  const passwordUtils = new PasswordUtils();
  const tokenManager = new TokenManager();

  // Services
  const userService = new UserService({
    db,
    utils: {
      password: passwordUtils,
      tokenManager,
    },
  });

  // Controllers
  const userController = new UserController({
    services: {
      user: userService,
    },
    validators: {
      auth: authValidator,
    },
  });

  // Routers
  const userRouter = new UserRouter({
    user: userController,
  });
  const publicRouter = new MainRouter(userRouter);

  const server = new Server({
    logger,
    errorHandler,
    routers: [publicRouter],
    middlewares: [express.json()],
  });

  return server;
}
