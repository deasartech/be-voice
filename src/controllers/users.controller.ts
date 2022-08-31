import { Request, Response } from "express";
import Realm from "realm";
import * as dotenv from "dotenv";

dotenv.config();

const realm = Realm.App.getApp(process.env.APP_ID);

export const postUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await realm.emailPasswordAuth.registerUser({
      email,
      password,
    });
    console.log("Successfully created new user");
    res.status(200).send(user);
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ msg: err.message });
  }
};
