import { Request, Response } from "express";
import TopicModel from "../models/topics.model";

export const getTopics = async (req: Request, res: Response) => {
  try {
    const topics = await TopicModel.find({});
    res.status(200).send({ topics });
  } catch (err) {
    console.log(err);
    res.status(404).send("Topics Not Found");
  }
};

export const getTopicBySlug = async (req: Request, res: Response) => {
  const { word } = req.params;
  try {
    const topic = await TopicModel.find({ slug: word });
    topic.length
      ? res.status(200).send({ topic })
      : res.status(404).send({ msg: "Topic Not Found" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Bad Request", res: err.message });
  }
};
