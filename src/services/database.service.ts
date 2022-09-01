import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { Topic } from "../../database";

export const collections: { topics?: mongoDB.Collection<Topic> } = {};

export async function connectMongoose() {
  dotenv.config();

  const mongoURI = process.env.DB_CONN_STRING;
  const db = process.env.VOICE_DB_NAME;

  await mongoose.connect(mongoURI, {
    dbName: db,
  });

  console.log(`Successfully connected to database: ${db}`);
}

export async function disconnectMongoose() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log("DB disconnect error");
  }
}
