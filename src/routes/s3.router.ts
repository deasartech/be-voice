import express from "express";
import { getS3URL } from "../controllers/s3.controller";

export const s3Router = express.Router();

s3Router.use(express.json());

// GET
s3Router.route("/upload-url").get(getS3URL);
