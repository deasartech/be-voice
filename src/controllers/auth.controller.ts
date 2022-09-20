import { Request, Response } from "express";
import Realm from "realm";
import * as dotenv from "dotenv";
import UserModel from "../models/users.model";

dotenv.config();

export const realm = Realm.App.getApp(process.env.APP_ID);

// POST sign up new user
export const postUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    // user custom
    const user = new UserModel({
      uid: null,
      email: email,
      username: username,
      details: {
        first_name: null,
        last_name: null,
        date_of_birth: null,
        phone_number: null,
      },
      created_at: Number(new Date()),
      description: null,
      url: null,
      subscribers_count: 0,
      notes_count: 0,
      favorites_count: 0,
      replies_count: 0,
      time_zone: null,
      location: null,
      lang: "en",
      profile_photo_image_url: null,
      profile_color: null,
      subscriptions: [],
      interests: [],
      protected: false,
      verified: false,
      is_replier: false,
    });
    const newUser = await user.save();
    console.log("new user Document created for", newUser);
    // auth user
    await realm.emailPasswordAuth.registerUser({
      email,
      password,
    });
    console.log("Successfully created new user");
    res.status(200).send({ msg: "Successfully created new user" });
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ msg: err.message });
  }
};

// POST sign in user
export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // sign in with credentials
    const credentials: Realm.Credentials = Realm.Credentials.emailPassword(
      email,
      password
    );
    const user: Realm.User = await realm.logIn(credentials);

    // update user doc with uid
    await UserModel.updateOne(
      { email: email },
      {
        uid: user.id,
      }
    );

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
