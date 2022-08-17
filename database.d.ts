// this file contains types for the database layer

import { ObjectId } from "mongodb";

interface Topic {
  description: string;
  slug: string;
  id?: ObjectId;
}
