import express from "express";
import { postUser } from "../controllers/users.controller";

export const usersRouter = express.Router();

usersRouter.use(express.json());

// post user : signup
usersRouter.route("/signup").post(postUser);
