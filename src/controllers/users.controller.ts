import { Request, Response } from "express";
import Realm from "realm";
import * as dotenv from "dotenv";
import UserModel from "../models/users.model";

// Custom User Data
interface IUserUpdate {
  email?: string;
  username?: string;
  description?: string;
  url?: string;
  subscribers_count?: number;
  friends_count?: number;
  notes_count?: number;
  favorites_count?: number;
  replies_count?: number;
  time_zone?: string;
  location?: string;
  lang?: string;
  profile_photo_image_url?: string;
  profile_color?: string;
  following?: string[];
  protected?: boolean;
  verified?: boolean;
}

// GET all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    console.log("Found users:", users);
    res.status(200).send({ users });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Bad Request" });
  }
};

// GET user by username
export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  console.log(req.params);
  try {
    const user = await UserModel.findOne({ username: username });
    console.log("Found user:", user);
    user !== null
      ? res.status(200).send({ user })
      : res.status(404).send({ msg: "User Not Found" });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ msg: "Bad Request" });
  }
};

// PATCH user username
export const patchUserUsernameByUsername = async (
  req: Request,
  res: Response
) => {
  try {
    const { user } = req.params;
    const {
      email,
      username,
      description,
      url,
      timeZone,
      location,
      lang,
      profilePhoto,
      profileColor,
      isProtected,
    } = req.body;
    // create updates object and build if value not null
    const updates: IUserUpdate = {};
    if (email) {
      updates.email = email;
    }
    if (username) {
      updates.username = username;
    }
    if (description) {
      updates.description = description;
    }
    if (url) {
      updates.url = url;
    }
    if (timeZone) {
      updates.time_zone = timeZone;
    }
    if (location) {
      updates.location = location;
    }
    if (lang) {
      updates.lang = lang;
    }
    if (profilePhoto) {
      updates.profile_photo_image_url = profilePhoto;
    }
    if (profileColor) {
      updates.profile_color = profileColor;
    }
    if (isProtected) {
      updates.protected = isProtected;
    }

    console.log(updates, "updates");
    const response = await UserModel.updateOne({ username: user }, updates);
    console.log("Successfully updated user");
    res.status(200).send({ response });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ msg: "Bad Request" });
  }
};
