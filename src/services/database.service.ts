import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { Topic } from "../../database";
import Realm from "realm";

export const collections: { topics?: mongoDB.Collection<Topic> } = {};

export async function connectMongoose() {
  dotenv.config();

  // Realm
  const id = process.env.APP_ID;
  const config = {
    id,
  };
  const realm = new Realm.App(config);

  // mongoose
  const mongoURI = process.env.DB_CONN_STRING;
  const db = process.env.VOICE_DB_NAME;

  await mongoose.connect(mongoURI, {
    dbName: db,
  });

  console.log(`Successfully connected to database: ${db}`);
  console.log(`Success s3 bucket`);
}

export async function disconnectMongoose() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log("DB disconnect error");
  }
}
