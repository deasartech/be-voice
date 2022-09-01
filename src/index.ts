import express from "express";
import cors from "cors";
import Realm from "realm";
import * as dotenv from "dotenv";
import { connectMongoose } from "./services/database.service";
import { apiRouter } from "./routes/api.router";

export const app = express();
const { PORT = 9090 } = process.env;

// make connection
connectMongoose()
  .then(() => {
    dotenv.config();
    const id = process.env.APP_ID;
    const config = {
      id,
    };
    const realm = new Realm.App(config);
    app.use(express.json());
    app.use(cors());

    // test endpoint
    app.get("/", (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Hello World</h1>");
    });

    // set apiRouter
    app.use("/api", apiRouter);

    // start the server
    app.listen(PORT, () => {
      console.log(`server running : http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
