import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id?: ObjectId;
  uid?: string;
  email: string;
  username: string;
  details: {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    phone_number: string;
  };
  created_at: number;
  description: string;
  url: string;
  subscribers_count: number;
  notes_count: number;
  favorites_count: number;
  replies_count: number;
  time_zone: string;
  location: string;
  lang: string;
  profile_photo_image_url: string;
  profile_color: string;
  subscribers: string[];
  subscriptions: string[];
  interests: string[];
  protected: boolean;
  verified: boolean;
  is_replier: boolean;
  __v?: number;
}

// user update interface
export interface IUserUpdate {
  email?: string;
  username?: string;
  description?: string;
  url?: string;
  subscribers_count?: number;
  friends_count?: number;
  notes_count?: number;
  favorites_count?: number;
  replies_count?: number;
  time_zone?: string;
  location?: string;
  lang?: string;
  profile_photo_image_url?: string;
  profile_color?: string;
  subscribers?: string[];
  subscriptions?: string[];
  protected?: boolean;
  verified?: boolean;
}

// user details update interface
export interface IUserDetailsUpdate {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
}

// details schema
const DetailsSchema: Schema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  date_of_birth: { type: String },
  phone_number: { type: String, unique: true },
});

// UserSchema for model
export const UserSchema: Schema = new Schema({
  uid: { type: String, default: null },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  details: { type: DetailsSchema },
  created_at: { type: Number },
  description: { type: String, default: null },
  url: { type: String, default: null },
  subscribers_count: { type: Number },
  notes_count: { type: Number },
  favorites_count: { type: Number },
  replies_count: { type: Number },
  time_zone: { type: String, default: null },
  location: { type: String, default: null },
  lang: { type: String },
  profile_photo_image_url: { type: String, default: null },
  profile_color: { type: String, default: null },
  subscribers: { type: Array },
  subscriptions: { type: Array },
  interests: { type: Array },
  protected: { type: Boolean },
  verified: { type: Boolean },
  is_replier: { type: Boolean },
  __v: { type: Number, required: false },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
