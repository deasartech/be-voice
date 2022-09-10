import express from "express";
import { topicsRouter } from "./topics.router";
import { authRouter } from "./auth.router";
import { usersRouter } from "./users.router";
import { notesRouter } from "./notes.router";

export const apiRouter = express.Router();

// set routers
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/notes", notesRouter);
