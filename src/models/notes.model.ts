import mongoose, { Schema, Document, ObjectId } from "mongoose";

// Note User interface
export interface NoteUser {
  uid: string;
  username: string;
}

// Note User Schema
const NoteUserSchema: Schema = new Schema({
  uid: { type: String, required: true },
  username: { type: String, required: true },
});

// Note Interface
export interface INote extends Document {
  _id?: ObjectId;
  created_at: string;
  title: string;
  description: string;
  voice_note_url_string: string;
  img_url_str: string;
  user: NoteUser;
  comments_count: number;
  cheers_count: number;
  topic: string;
  references: string[];
  hashtags: string[];
  labels: string[];
  user_mentions: string[];
}

export interface INoteUpdate {
  created_at: string;
  title: string;
  description: string;
  voice_note_url_string: string;
  img_url_str: string;
  user: NoteUser;
  comments_count: number;
  cheers_count: number;
  topic: string;
}

// Note Schema
export const NoteSchema: Schema = new Schema({
  created_at: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  voice_note_url_string: { type: String, required: true },
  img_url_str: { type: String },
  user: { type: NoteUserSchema, required: true },
  comments_count: { type: Number },
  cheers_count: { type: Number },
  topic: { type: String, required: true },
  references: { type: Array },
  hashtags: { type: Array },
  labels: { type: Array },
  user_mentions: { type: Array },
});

const NoteModel = mongoose.model<INote>("Note", NoteSchema);
export default NoteModel;
