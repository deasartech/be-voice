import express from "express";
import cors from "cors";
import Realm from "realm";
import * as dotenv from "dotenv";
import { connectMongoose } from "./services/database.service";
import { topicsRouter } from "./routes/topics.router";
import { usersRouter } from "./routes/users.router";

const app = express();
app.use(cors());
const { PORT = 9090 } = process.env;

// make connection
// connectToDatabase()
connectMongoose()
  .then(() => {
    dotenv.config();
    const id = process.env.APP_ID;
    const config = {
      id,
    };
    const realm = new Realm.App(config);
    app.use(express.json());

    // test endpoint
    app.get("/", (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Hello World</h1>");
    });

    // set routers to use for each route
    app.use("/topics", topicsRouter);
    app.use("/auth", usersRouter);

    // start the server
    app.listen(PORT, () => {
      console.log(`server running : http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
