import { Request, Response } from "express";

import { generateUploadUrl } from "../utils/s3";

// GET s3 URL
export const getS3URL = async (req: Request, res: Response) => {
  try {
    const url = await generateUploadUrl();
    res.status(200).send({ url });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Bad Request" });
  }
};
