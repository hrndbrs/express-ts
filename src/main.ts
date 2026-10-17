import express from "express";
import Server from "./application/server";
import getDB from "./config/db";
import createLogger from "./config/logging";
import { HealthController, UserController } from "./controllers";
import { PasswordUtils, TokenManager } from "./lib/utils";

import { AuthValidator } from "./lib/validators";
import type { DB, Logger } from "./lib/interfaces";
import { globalErrorHandler } from "./middlewares";
import { HealthRouter, MainRouter, UserRouter } from "./routers";
import { HealthService, UserService } from "./services";

type Dependencies = {
  logger?: Logger;
  db?: DB;
};

export default function createServer({
  logger = createLogger(),
  db = getDB(logger),
}: Dependencies = {}) {
  // Libs
  const authValidator = new AuthValidator();
  const passwordUtils = new PasswordUtils();
  const tokenManager = new TokenManager();

  // Services
  const userService = new UserService(db, {
    utils: {
      password: passwordUtils,
      tokenManager,
    },
  });

  const healthService = new HealthService(db);

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
  const mainRouter = new MainRouter();
  const userRouter = new UserRouter({
    user: userController,
  });
  const healthRouter = new HealthRouter({
    health: healthController,
  });

  mainRouter.addSubRouters(healthRouter, userRouter);

  const server = new Server({
    logger,
  });

  server.addMiddlewares(express.json());
  server.registerRoutes(mainRouter);
  server.addMiddlewares(globalErrorHandler);

  return server;
}
