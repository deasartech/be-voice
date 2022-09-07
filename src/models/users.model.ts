import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id?: ObjectId;
  uid?: string;
  email: string;
  username: string;
  created_at: string;
  description: string;
  url: string;
  subscribers_count: number;
  friends_count: number;
  notes_count: number;
  favorites_count: number;
  replies_count: number;
  time_zone: string;
  location: string;
  lang: string;
  profile_photo_image_url: string;
  profile_color: string;
  following: string[];
  protected: boolean;
  verified: boolean;
  __v?: number;
}

export const UserSchema: Schema = new Schema({
  uid: { type: String, default: null },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  created_at: { type: String },
  description: { type: String, default: null },
  url: { type: String, default: null },
  subscribers_count: { type: Number },
  friends_count: { type: Number },
  notes_count: { type: Number },
  favorites_count: { type: Number },
  replies_count: { type: Number },
  time_zone: { type: String, default: null },
  location: { type: String, default: null },
  lang: { type: String },
  profile_photo_image_url: { type: String, default: null },
  profile_color: { type: String, default: null },
  following: { type: Array },
  protected: { type: Boolean },
  verified: { type: Boolean },
  __v: { type: Number, required: false },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
