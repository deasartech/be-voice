import express from "express";
import { getNotes, postNote } from "../controllers/notes.controller";

export const notesRouter = express.Router();

notesRouter.use(express.json());

// GET
notesRouter.route("/").get(getNotes);

// POST
notesRouter.route("/post").post(postNote);
