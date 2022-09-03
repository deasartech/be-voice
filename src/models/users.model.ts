import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id?: ObjectId;
  uid?: string;
  email: string;
  username: string;
}

const UserSchema: Schema = new Schema({
  uid: { type: String },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
