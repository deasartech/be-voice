import express from "express";
import { topicsRouter } from "./topics.router";
import { usersRouter } from "./users.router";

export const apiRouter = express.Router();

// set routers
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/auth", usersRouter);
