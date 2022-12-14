import express from "express";
import {
  getUserByUsername,
  getUsers,
  getUserByUID,
  patchUserByUID,
  patchUserDetailsByUID,
  patchUserReplierByUID,
  patchUserSubsByUID,
} from "../controllers/users.controller";

export const usersRouter = express.Router();

usersRouter.use(express.json());

// GET
usersRouter.route("/").get(getUsers);
usersRouter.route("/:uid").get(getUserByUID);
usersRouter.route("/username/:username").get(getUserByUsername);

// PATCH
usersRouter.route("/:uid").patch(patchUserByUID);
usersRouter.route("/:uid/details").patch(patchUserDetailsByUID);
usersRouter.route("/:uid/permissions").patch(patchUserReplierByUID);
usersRouter.route("/:uid/subscribe").patch(patchUserSubsByUID);
