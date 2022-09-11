import { Request, Response } from "express";
import NoteModel, {
  INoteUpdate,
  INoteUpdatePatch,
  NoteUser,
} from "../models/notes.model";
import UserModel from "../models/users.model";
import TopicModel from "../models/topics.model";
import Realm from "realm";
import { realm } from "./auth.controller";

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
      res
        .status(200)
        .send({ res: newNote, msg: "Successfully Added New Note" });
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

// PATCH Note By ID
export const patchNoteByID = async (req: Request, res: Response) => {
  const { note_id } = req.params;
  const { title, description, cheers_count, comments_count } = req.body;
  try {
    // console.log(realm.currentUser.id, "realm user");
    // const note = await NoteModel.findOne({ _id: note_id });
    // console.log(note, "note");
    // if (note.user.uid === realm.currentUser.id) {
    // }
    const update: INoteUpdatePatch = {};
    if ((title || description) && (cheers_count || comments_count)) {
      res.status(400).send({ msg: "Error Cannot Updated Note" });
    } else if (title || description) {
      if (title) {
        update.title = title;
      }
      if (description) {
        update.description = description;
      }
      const updatedNote = await NoteModel.updateOne({ _id: note_id }, update);
      console.log(updatedNote, "updated note 1");
      updatedNote.matchedCount !== 0
        ? res
            .status(200)
            .send({ res: updatedNote, msg: "Successfully Updated Note" })
        : res.status(400).send({ msg: "Error Cannot Updated Note" });
    } else if (cheers_count || comments_count) {
      if (cheers_count) {
        update.cheers_count = cheers_count;
      }
      if (comments_count) {
        update.comments_count = comments_count;
      }
      const updatedCount = await NoteModel.updateOne(
        { _id: note_id },
        { $inc: update }
      );
      console.log(updatedCount, "updated Count");
      updatedCount.matchedCount !== 0
        ? res
            .status(200)
            .send({ res: updatedCount, msg: "Successfully Updated Note" })
        : res.status(400).send({ msg: "Error Cannot Updated Note" });
    } else {
      res.status(400).send({ msg: "Error Cannot Updated Note" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ msg: err.message });
  }
};

// DEL Note
export const removeNoteByID = async (req: Request, res: Response) => {
  const { note_id } = req.params;
  try {
    const removed = await NoteModel.deleteOne({ _id: note_id });
    res.status(200).send({ res: removed, msg: "Successfully Deleted Note" });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ msg: "Error Note Not Found" });
  }
};
