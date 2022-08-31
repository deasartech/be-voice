import { Request, Response } from "express";
import Realm from "realm";
import * as dotenv from "dotenv";

dotenv.config();

const realm = Realm.App.getApp(process.env.APP_ID);

// POST signup new user
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

// POST signin user
export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const credentials = Realm.Credentials.emailPassword(email, password);
    const user = await realm.logIn(credentials);
    console.log(`Successfully logged in as user ${user.id}`);
    console.log("user: ", user.id);
    res.status(200).send({ msg: "Successfully logged in!", userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(401).send("Error loggin in!");
  }
};
