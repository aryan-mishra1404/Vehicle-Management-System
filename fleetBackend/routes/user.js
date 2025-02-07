import express from "express";
import { userSignIn, userSignUp } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/signup").post(userSignUp);
router.route("/signin").post(userSignIn);

export default router;
