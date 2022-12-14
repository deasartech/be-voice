import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose";

export interface ITopic extends Document {
  _id?: ObjectId;
  description: string;
  slug: string;
}

export const TopicSchema: Schema = new Schema({
  _id: { type: ObjectId },
  description: { type: String, required: true },
  slug: { type: String, required: true },
});

const TopicModel = mongoose.model<ITopic>("Topic", TopicSchema);
export default TopicModel;
