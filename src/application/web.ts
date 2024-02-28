import express from "express";
import publicRouter from "../routers/public-api";
import { errorHandler } from "../middlewares/error-handler";

export const web = express();

web.use(express.json());
web.use(publicRouter);
web.use(errorHandler);
