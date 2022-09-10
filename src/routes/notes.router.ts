import express from "express";
import {
  getNotes,
  postNote,
  removeNoteByID,
} from "../controllers/notes.controller";

export const notesRouter = express.Router();

notesRouter.use(express.json());

// GET
notesRouter.route("/").get(getNotes);

// POST
notesRouter.route("/post").post(postNote);

// DEL
notesRouter.route("/:note_id").delete(removeNoteByID);
