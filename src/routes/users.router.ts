import express from "express";
import {
  getUserByUsername,
  getUsers,
  patchUserByUsername,
} from "../controllers/users.controller";

export const usersRouter = express.Router();

usersRouter.use(express.json());

// GET
usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUserByUsername);
usersRouter.route("/:user").patch(patchUserByUsername);
