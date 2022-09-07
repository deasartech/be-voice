import { agent as request } from "supertest";
import { app } from "../../index";
import {
  connectMongoose,
  disconnectMongoose,
} from "../../services/database.service";
import { ITopic } from "../../models/topics.model";
import { IUser, UserSchema } from "../../models/users.model";

beforeAll(async () => await connectMongoose());

afterAll(async () => await disconnectMongoose());

// Topics Tests

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

    test("should return a topic if ':word' is valid ", () => {
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

// Users Tests

describe("Users", () => {
  describe("GET /users", () => {
    test("should return all users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }: any) => {
          const { users } = body;
          expect(users).toBeInstanceOf(Array);
          users.forEach((user: IUser) => {
            expect(user).toHaveProperty("_id");
            expect(user).toHaveProperty("uid");
            expect(user).toHaveProperty("email");
            expect(user).toHaveProperty("username");
            expect(user).toHaveProperty("created_at");
            expect(user).toHaveProperty("description");
            expect(user).toHaveProperty("subscribers_count");
            expect(user).toHaveProperty("friends_count");
            expect(user).toHaveProperty("notes_count");
            expect(user).toHaveProperty("favorites_count");
            expect(user).toHaveProperty("replies_count");
            expect(user).toHaveProperty("time_zone");
            expect(user).toHaveProperty("location");
            expect(user).toHaveProperty("lang");
            expect(user).toHaveProperty("profile_photo_image_url");
            expect(user).toHaveProperty("profile_color");
            expect(user).toHaveProperty("following");
            expect(user).toHaveProperty("protected");
            expect(user).toHaveProperty("verified");
            expect(user._id).toEqual(expect.any(String));
            expect(user.email).toEqual(expect.any(String));
            expect(user.username).toEqual(expect.any(String));
            expect(user.created_at).toEqual(expect.any(String));
            expect(user.subscribers_count).toEqual(expect.any(Number));
            expect(user.friends_count).toEqual(expect.any(Number));
            expect(user.notes_count).toEqual(expect.any(Number));
            expect(user.favorites_count).toEqual(expect.any(Number));
            expect(user.replies_count).toEqual(expect.any(Number));
            expect(user.lang).toEqual(expect.any(String));
            expect(user.following).toEqual(expect.any(Array));
            expect(user.protected).toEqual(expect.any(Boolean));
            expect(user.verified).toEqual(expect.any(Boolean));
          });
        });
    });
  });

  describe("GET /users/:username", () => {
    test("should return a 404 status if user is not found", () => {
      return request(app)
        .get("/api/users/doesntexist")
        .expect(404)
        .then(({ body }: any) => {
          expect(body.msg).toBe("User Not Found");
        });
    });

    test("should return a user if ':username' is valid ", () => {
      return request(app)
        .get("/api/users/updated")
        .expect(200)
        .then(({ body }: any) => {
          const { user } = body;
          console.log(user);
          expect(user).toBeInstanceOf(Object);
          expect(user).toHaveProperty("_id");
          expect(user).toHaveProperty("uid");
          expect(user).toHaveProperty("email");
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("created_at");
          expect(user).toHaveProperty("description");
          expect(user).toHaveProperty("subscribers_count");
          expect(user).toHaveProperty("friends_count");
          expect(user).toHaveProperty("notes_count");
          expect(user).toHaveProperty("favorites_count");
          expect(user).toHaveProperty("replies_count");
          expect(user).toHaveProperty("time_zone");
          expect(user).toHaveProperty("location");
          expect(user).toHaveProperty("lang");
          expect(user).toHaveProperty("profile_photo_image_url");
          expect(user).toHaveProperty("profile_color");
          expect(user).toHaveProperty("following");
          expect(user).toHaveProperty("protected");
          expect(user).toHaveProperty("verified");
        });
    });
  });

  describe("PATCH /users/:username", () => {
    test("should return response object if succesfully updates username ", () => {
      const nameChange = {
        username: "newname",
      };
      return request(app)
        .patch("/api/users/lol")
        .send(nameChange)
        .expect(200)
        .then(({ body }: any) => {
          const { response } = body;
          console.log(response);
          expect(response).toBeInstanceOf(Object);
          expect(response.acknowledged).toBe(true);
          expect(response.modifiedCount).toEqual(expect.any(Number));
          expect(response).toHaveProperty("matchedCount");
        });
    });

    test("should return matchedCount 1, modifiedCount 1 if succesfully updates description, url, location ", () => {
      const update = {
        description: "Hello World, glad to finally be here",
        url: "newtesting.url.io",
        location: "Bay Area, CA",
      };
      return request(app)
        .patch("/api/users/two")
        .send(update)
        .expect(200)
        .then(({ body }: any) => {
          const { response } = body;
          console.log(response);
          expect(response).toBeInstanceOf(Object);
          expect(response.acknowledged).toBe(true);
          expect(response.modifiedCount).toBe(1);
          expect(response.matchedCount).toBe(1);
        });
    });
  });
});
