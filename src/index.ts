import express from "express";
import cors from "cors";
import Realm from "realm";
import * as dotenv from "dotenv";
import { connectToDatabase } from "./services/database.service";
import { topicsRouter } from "./routes/topics.router";

const app = express();
app.use(cors());
const { PORT = 9090 } = process.env;

// make connection
connectToDatabase()
  .then(() => {
    dotenv.config();
    const id = process.env.APP_ID;
    const config = {
      id,
    };
    const realm = new Realm.App(config);
    app.use(express.json());

    // set routers to use for each route
    app.use("/topics", topicsRouter);

    // start the server
    app.listen(PORT, () => {
      console.log(`server running : http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
