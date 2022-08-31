import { Request, Response } from "express";
import Realm from "realm";
import * as dotenv from "dotenv";

dotenv.config();

const realm = Realm.App.getApp(process.env.APP_ID);

// POST sign up new user
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

// POST sign in user
export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const credentials: Realm.Credentials = Realm.Credentials.emailPassword(
      email,
      password
    );
    const user: Realm.User = await realm.logIn(credentials);
    console.log(`Successfully signed in as user ${user.id}`);
    console.log("user: ", user.profile);
    res
      .status(200)
      .send({ msg: "Successfully signed in!", user: user.profile });
  } catch (err) {
    console.error(err.message);
    res.status(401).send({ msg: "Error signing in!" });
  }
};

// GET sign out current user
export const getSignOutUser = async (req: Request, res: Response) => {
  try {
    await realm.currentUser.logOut();
    console.log(`Successfully signed out user`);
    res.status(200).send({ msg: "Successfully signed out" });
  } catch (err) {
    console.error(err.message);
    res.status(401).send({ msg: "Error signing out!" });
  }
};

// GET current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    console.log(realm.currentUser.profile.email, "is currently signed in");
    const user: Realm.User = realm.currentUser;
    res.status(200).send({ user: user.profile, userId: user.id });
  } catch (err) {
    console.error(err.message);
    res.status(401).send({ msg: err.message });
  }
};
