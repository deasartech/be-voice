import express from "express";
import {
  postLogin,
  postUser,
  getSignOutUser,
} from "../controllers/users.controller";

export const usersRouter = express.Router();

usersRouter.use(express.json());

// POST
usersRouter.route("/signup").post(postUser);
usersRouter.route("/connect").post(postLogin);
// GET
usersRouter.route("/disconnect").get(getSignOutUser);
