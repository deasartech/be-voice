import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { connectMongoose } from "./services/database.service";
import { apiRouter } from "./routes/api.router";

export const app = express();
const { PORT = 9090 } = process.env;

dotenv.config();

// server
app.use(express.json());
app.use(cors());

// set apiRouter
app.use("/api", apiRouter);

// start the server
export const server = app.listen(PORT, () => {
  console.log(`server running : http://localhost:${PORT}`);
});

// make connection
connectMongoose();
