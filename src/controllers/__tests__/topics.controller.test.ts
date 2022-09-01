const request = require("supertest");
import { doesNotMatch } from "assert";
import { app } from "../../index";
import {
  connectMongoose,
  disconnectMongoose,
} from "../../services/database.service";
import { ITopic, TopicSchema } from "../../models/topics.model";

beforeAll(async () => await connectMongoose());

afterAll(async () => await disconnectMongoose());

describe("Topics", () => {
  describe("GET /topics", () => {
    test("should return all topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }: any) => {
          const { topics } = body;
          expect(topics).toBeInstanceOf(Array);
          topics.forEach((topic: ITopic) => {
            expect(topic).toHaveProperty("description");
            expect(topic).toHaveProperty("slug");
            expect(topic._id).toEqual(expect.any(String));
            expect(topic.description).toEqual(expect.any(String));
            expect(topic.slug).toEqual(expect.any(String));
          });
        });
    });
  });

  describe("GET /topics/:word", () => {
    test("should return a 404 status if topic is not found", () => {
      return request(app)
        .get("/api/topics/none")
        .expect(404)
        .then(({ body }: any) => {
          expect(body.msg).toBe("Topic Not Found");
        });
    });

    test("should return a topic of ':word' is valid ", () => {
      return request(app)
        .get("/api/topics/comedy")
        .expect(200)
        .then(({ body }: any) => {
          const { topic } = body;
          console.log(topic);
          expect(topic).toBeInstanceOf(Array);
          expect(topic).toHaveLength(1);
          const obj = topic[0];
          expect(obj).toBeInstanceOf(Object);
          expect(obj).toHaveProperty("_id");
          expect(obj).toHaveProperty("description");
          expect(obj).toHaveProperty("slug");
        });
    });
  });
});
