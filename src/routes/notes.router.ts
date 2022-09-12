import express from "express";
import {
  getNotes,
  getNoteByID,
  patchNoteByID,
  postNote,
  removeNoteByID,
} from "../controllers/notes.controller";

export const notesRouter = express.Router();

notesRouter.use(express.json());

// GET
notesRouter.route("/").get(getNotes);
notesRouter.route("/:note_id").get(getNoteByID);

// POST
notesRouter.route("/post").post(postNote);

// PATCH
notesRouter.route("/:note_id").patch(patchNoteByID);

// DEL
notesRouter.route("/:note_id").delete(removeNoteByID);
