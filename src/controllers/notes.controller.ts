import { Request, Response } from "express";
import NoteModel, { INoteUpdate, NoteUser } from "../models/notes.model";
import UserModel from "../models/users.model";
import TopicModel from "../models/topics.model";

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
  const {
    username,
    uid,
    title,
    description,
    voice_note_url_string,
    img_url_str,
    topic,
  } = req.body;
  try {
    const checkTopicExists = await TopicModel.findOne({ slug: topic });
    const checkUserExists = await UserModel.findOne({
      uid: uid,
      username: username,
    });
    console.log(checkTopicExists, "topic exists");
    console.log(checkUserExists, "user exists");
    if (checkUserExists !== null && checkTopicExists !== null) {
      // create updates object and build if value not null
      const user: NoteUser = {
        uid: uid,
        username: username,
      };
      // minimum values - add more to further develop
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
    } else if (checkUserExists === null) {
      res.status(401).send({ msg: "Cannot Post Note: User Does Not Exist" });
    } else if (checkTopicExists === null) {
      res.status(401).send({ msg: "Cannot Post Note: Topic Does Not Exist" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ msg: err.message });
  }
};
