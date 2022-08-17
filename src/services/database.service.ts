import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { Topic } from "../../database";

export const collections: { topics?: mongoDB.Collection<Topic> } = {};

export async function connectToDatabase() {
  // Pulls in the .env file so it can be accessed from process.env. No path as .env is in root, the default location
  dotenv.config();

  // Create a new MongoDB client with the connection string from .env
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING
  );

  // Connect to the cluster
  await client.connect();

  // Connect to the database with the name specified in .env
  const db = client.db(process.env.VOICE_DB_NAME);

  // Apply schema validation to the collection
  await applySchemaValidation(db);

  // Connect to the collection with the specific name from .env, found in the database previously specified
  const topicsCollection: mongoDB.Collection<Topic> = db.collection(
    process.env.TOPICS_COLLECTION_NAME
  );

  collections.topics = topicsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${topicsCollection.collectionName}`
  );
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Game model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongoDB.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["description", "slug"],
      additionalProperties: false,
      properties: {
        _id: {},
        description: {
          bsonType: "string",
          description: "'description' is required and is a string",
        },
        slug: {
          bsonType: "string",
          description: "'slug' is required and is a number",
        },
      },
    },
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db
    .command({
      collMod: process.env.TOPICS_COLLECTION_NAME,
      validator: jsonSchema,
    })
    .catch(async (error: mongoDB.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection(process.env.TOPICS_COLLECTION_NAME, {
          validator: jsonSchema,
        });
      }
    });
}
