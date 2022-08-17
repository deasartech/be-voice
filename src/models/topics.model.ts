import { collections } from "../services/database.service";

export const selectTopics = async () => {
  const result = await collections.topics.find({}).toArray();
  return result;
};
