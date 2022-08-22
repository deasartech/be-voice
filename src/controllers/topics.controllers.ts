import express, { Request, Response } from "express";
import { selectTopics } from "../models/topics.models";

export const getTopics = async (req: Request, res: Response) => {
  try {
    const topics = await selectTopics();
    res.status(200).send({ topics });
  } catch (err) {
    console.log(err);
  }
};
