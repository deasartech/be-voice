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
  created_at: number;
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

// For Controller Use
export interface INoteUpdate {
  created_at: number;
  title: string;
  description: string;
  voice_note_url_string: string;
  img_url_str: string;
  user: NoteUser;
  comments_count: number;
  cheers_count: number;
  topic: string;
  references: string[];
}

// For PATCH cheers and comments
export interface INoteUpdatePatch {
  title?: string;
  description?: string;
  comments_count?: number;
  cheers_count?: number;
}

// For Testing POST request
export interface INoteUpdatePost {
  title: string;
  description: string;
  voice_note_url_string: string;
  img_url_str: string;
  user: NoteUser;
  topic: string;
}

// Note Schema
export const NoteSchema: Schema = new Schema({
  // _id: { type: Schema.Types.ObjectId, required: false },
  created_at: { type: Number },
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
