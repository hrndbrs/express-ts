import supertest from "supertest";
import { UserTest } from "./test-util";

import createServer from "../src/main";
import createLogger from "../src/config/logging";
import getDB from "../src/config/db";

const server = createServer().app;
const logger = createLogger();
const db = getDB(logger);

const userTest = new UserTest(db);

describe("POST /api/users", () => {
  afterEach(async () => {
    await userTest.delete();
  });

  it("should reject request with invalid request body", async () => {
    const response = await supertest(server).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should register new user", async () => {
    const response = await supertest(server).post("/api/users").send({
      username: "test",
      password: "test",
      name: "test",
    });

    logger.debug(response.body);

    expect(response.status).toBe(201);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await userTest.create();
  });

  afterEach(async () => {
    await userTest.delete();
  });

  it("should be able to login", async () => {
    const response = await supertest(server).post("/api/users/login").send({
      username: "test",
      password: "test",
    });

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.token).toBeDefined();
  });

  it("should reject login attempt with incorrect username", async () => {
    const response = await supertest(server).post("/api/users/login").send({
      username: "incorrect",
      password: "test",
    });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Username/Password is incorrect");
  });

  it("should reject login attempt with incorrect password", async () => {
    const response = await supertest(server).post("/api/users/login").send({
      username: "test",
      password: "incorrect",
    });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Username/Password is incorrect");
  });
});
