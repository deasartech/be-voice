import { Request, Response } from "express";
import Realm from "realm";
import * as dotenv from "dotenv";
import UserModel from "../models/users.model";

// Custom User Data

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
    const { username } = req.params;
    const { newUsername } = req.body;
    const response = await UserModel.updateOne(
      { username: username },
      {
        username: newUsername,
      }
    );
    console.log("Successfully updated username");
    res.status(200).send({ response });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ msg: "Bad Request" });
  }
};
