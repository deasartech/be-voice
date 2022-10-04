import express from "express";
import {
  getUserByUsername,
  getUsers,
  getUserByUID,
  // getS3URL,
  patchUserByUID,
  patchUserDetailsByUID,
  patchUserReplierByUID,
  patchUserSubsByUID,
} from "../controllers/users.controller";

export const usersRouter = express.Router();

usersRouter.use(express.json());

// GET
usersRouter.route("/").get(getUsers);
usersRouter.route("/username/:username").get(getUserByUsername);
usersRouter.route("/:uid").get(getUserByUID);
// usersRouter.route("/s3-url").get(getS3URL);

// PATCH
usersRouter.route("/:uid").patch(patchUserByUID);
usersRouter.route("/:uid/details").patch(patchUserDetailsByUID);
usersRouter.route("/:uid/permissions").patch(patchUserReplierByUID);
usersRouter.route("/:uid/subscribe").patch(patchUserSubsByUID);
