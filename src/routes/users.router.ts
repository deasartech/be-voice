import express from "express";
import {
  getUsers,
<<<<<<< HEAD
  getUserByUsername,
  getUserByUID,
  getS3URL,
=======
  getUserByUID,
>>>>>>> main
  patchUserByUID,
  patchUserDetailsByUID,
  patchUserReplierByUID,
  patchUserSubsByUID,
  patchUserAvatarByUID,
} from "../controllers/users.controller";

import multer from "multer";

// multer image upload

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const usersRouter = express.Router();

usersRouter.use(express.json());
usersRouter.use("/:uid/avatar", upload.single("image"));

// GET
usersRouter.route("/").get(getUsers);
<<<<<<< HEAD
usersRouter.route("/s3-url").get(getS3URL);
usersRouter.route("/:uid").get(getUserByUID);
usersRouter.route("/username/:username").get(getUserByUsername);
=======
usersRouter.route("/username/:username").get(getUserByUsername);
usersRouter.route("/:uid").get(getUserByUID);
>>>>>>> main

// PATCH
usersRouter.route("/:uid").patch(patchUserByUID);
usersRouter.route("/:uid/avatar").patch(patchUserAvatarByUID);
usersRouter.route("/:uid/details").patch(patchUserDetailsByUID);
usersRouter.route("/:uid/permissions").patch(patchUserReplierByUID);
usersRouter.route("/:uid/subscribe").patch(patchUserSubsByUID);
