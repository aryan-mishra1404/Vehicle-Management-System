import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/signin").post(loginUser);

export default router;
