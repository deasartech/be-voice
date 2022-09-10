import { Request, Response } from "express";
import NoteModel, { INoteUpdate, NoteUser } from "../models/notes.model";

// GET All Notes
export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await NoteModel.find({});
    console.log("Found Notes", notes);
    res.status(200).send({ notes });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Bad Request" });
  }
};

// POST Note
export const postNote = async (req: Request, res: Response) => {
  try {
    // minimum values - add more to further develop
    const {
      username,
      uid,
      title,
      description,
      voice_note_url_string,
      img_url_str,
      topic,
    } = req.body;
    // create updates object and build if value not null
    const user: NoteUser = {
      uid: uid,
      username: username,
    };
    const updates: INoteUpdate = {
      created_at: Date(),
      title: title,
      description: description,
      voice_note_url_string: voice_note_url_string,
      img_url_str: img_url_str,
      user: user,
      comments_count: 0,
      cheers_count: 0,
      topic: topic,
    };

    // Post using Note Model
    const note = new NoteModel(updates);
    const newNote = await note.save();
    console.log("New Note Successfully Added", newNote);
    res.status(200).send({ msg: "Successfully Added New Note" });
  } catch (err) {}
};
