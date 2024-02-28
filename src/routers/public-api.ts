import express from "express";
import { UserController } from "../controllers/user-controller";

const router = express.Router();

router.post("/api/users", UserController.register);
router.post("/api/users/login", UserController.login);

export default router;
