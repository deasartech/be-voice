import express from "express";
import { getTopics, getTopicBySlug } from "../controllers/topics.controller";

export const topicsRouter = express.Router();

topicsRouter.use(express.json());

// get topics
topicsRouter.route("/").get(getTopics);
topicsRouter.route("/:word").get(getTopicBySlug);
