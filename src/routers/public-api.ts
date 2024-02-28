import express from "express";
import { UserController } from "../controllers/user-controller";

const router = express.Router();

router.post("/api/users", UserController.register);

export default router;
