import express from "express";
import {
  postLogin,
  postUser,
  getSignOutUser,
  getCurrentUser,
} from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.use(express.json());

// POST
authRouter.route("/signup").post(postUser);
authRouter.route("/connect").post(postLogin);
// GET
authRouter.route("/disconnect").get(getSignOutUser);
authRouter.route("/connected").get(getCurrentUser);
