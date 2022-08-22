import express, { Request, Response } from "express";
import { getTopics } from "../controllers/topics.controllers";

export const topicsRouter = express.Router();

topicsRouter.use(express.json());

// get topics
topicsRouter.route("/").get(getTopics);
