import express, { Request, Response } from "express";
import { getTopics } from "../controllers/topics.controller";

export const topicsRouter = express.Router();

topicsRouter.use(express.json());

// get topics
topicsRouter.route("/").get(getTopics);
