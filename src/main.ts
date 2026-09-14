import express from "express";
import Server from "./application/server";

import { HealthRouter, MainRouter, UserRouter } from "./routers";
import { HealthController, UserController } from "./controllers";
import { HealthService, UserService } from "./services";

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

  const healthService = new HealthService({ db });

  // Controllers
  const userController = new UserController({
    services: {
      user: userService,
    },
    validators: {
      auth: authValidator,
    },
  });

  const healthController = new HealthController({
    services: {
      health: healthService,
    },
  });

  // Routers
  const userRouter = new UserRouter({
    user: userController,
  });
  const healthRouter = new HealthRouter({
    health: healthController,
  });
  const publicRouter = new MainRouter(healthRouter, userRouter);

  const server = new Server({
    logger,
    errorHandler,
    routers: [publicRouter],
    middlewares: [express.json()],
  });

  return server;
}
