import { agent as request } from "supertest";
import { faker } from "@faker-js/faker";
import { app } from "../../index";
import {
  connectMongoose,
  disconnectMongoose,
} from "../../services/database.service";
import { ITopic } from "../../models/topics.model";
import { IUser } from "../../models/users.model";
import { INoteUpdatePost, NoteUser } from "../../models/notes.model";

beforeAll(async () => await connectMongoose());

afterAll(async () => await disconnectMongoose());

// Topics Tests

describe("__Topics__", () => {
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

describe("__Users__", () => {
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
            expect(user.details).toHaveProperty("first_name");
            expect(user.details).toHaveProperty("last_name");
            expect(user.details).toHaveProperty("date_of_birth");
            expect(user.details).toHaveProperty("phone_number");
            expect(user).toHaveProperty("created_at");
            expect(user).toHaveProperty("description");
            expect(user).toHaveProperty("subscribers_count");
            expect(user).toHaveProperty("notes_count");
            expect(user).toHaveProperty("favorites_count");
            expect(user).toHaveProperty("replies_count");
            expect(user).toHaveProperty("time_zone");
            expect(user).toHaveProperty("location");
            expect(user).toHaveProperty("lang");
            expect(user).toHaveProperty("profile_photo_image_url");
            expect(user).toHaveProperty("profile_color");
            expect(user).toHaveProperty("subscriptions");
            expect(user).toHaveProperty("protected");
            expect(user).toHaveProperty("verified");
            expect(user._id).toEqual(expect.any(String));
            expect(user.email).toEqual(expect.any(String));
            expect(user.username).toEqual(expect.any(String));
            expect(user.created_at).toEqual(expect.any(String));
            expect(user.subscribers_count).toEqual(expect.any(Number));
            expect(user.notes_count).toEqual(expect.any(Number));
            expect(user.favorites_count).toEqual(expect.any(Number));
            expect(user.replies_count).toEqual(expect.any(Number));
            expect(user.lang).toEqual(expect.any(String));
            expect(user.subscriptions).toEqual(expect.any(Array));
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
        .get("/api/users/one")
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
          expect(user).toHaveProperty("notes_count");
          expect(user).toHaveProperty("favorites_count");
          expect(user).toHaveProperty("replies_count");
          expect(user).toHaveProperty("time_zone");
          expect(user).toHaveProperty("location");
          expect(user).toHaveProperty("lang");
          expect(user).toHaveProperty("profile_photo_image_url");
          expect(user).toHaveProperty("profile_color");
          expect(user).toHaveProperty("subscriptions");
          expect(user).toHaveProperty("protected");
          expect(user).toHaveProperty("verified");
        });
    });
  });

  describe("PATCH /users/:uid", () => {
    test("should return response object if succesfully updates username ", () => {
      const nameChange = {
        username: faker.internet.userName(),
      };
      return request(app)
        .patch("/api/users/631917b8cb1c9f12723ad568")
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
        description: faker.lorem.lines(),
        url: faker.internet.domainName(),
        location: faker.address.cityName(),
        profilePhoto: faker.internet.avatar(),
        profileColor: faker.color.rgb(),
      };
      return request(app)
        .patch("/api/users/631917b8cb1c9f12723ad568")
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

  describe("PATCH /users/:uid/details", () => {
    test("should return response object if succesfully updates user details", () => {
      const update = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        date_of_birth: faker.date.birthdate(),
        phone_number: faker.phone.number(),
      };
      console.log(update, "update details");
      return request(app)
        .patch("/api/users/631917b8cb1c9f12723ad568/details")
        .send(update)
        .expect(200)
        .then(({ body }: any) => {
          const { response } = body;
          expect(response).toBeInstanceOf(Object);
          expect(response.acknowledged).toBe(true);
          expect(response.modifiedCount).toEqual(expect.any(Number));
          expect(response).toHaveProperty("matchedCount");
        });
    });
  });

  describe("PATCH /users/:uid/permissions", () => {
    test("should return error message when user details not complete", () => {
      const update = { isReplier: "true" };
      return request(app)
        .patch("/api/users/631917ab832ed938a5517cdb/permissions")
        .send(update)
        .expect(401)
        .then(({ body }: any) => {
          const { msg } = body;
          expect(msg).toBe("Error Not Authorized: Details not complete");
        });
    });

    test("should return response object when user details are complete", () => {
      const update = { isReplier: "true" };
      return request(app)
        .patch("/api/users/631917b8cb1c9f12723ad568/permissions")
        .send(update)
        .expect(200)
        .then(({ body }: any) => {
          const { response } = body;
          console.log(response, "<<< response");
          expect(response).toBeInstanceOf(Object);
          expect(response.acknowledged).toBe(true);
          expect(response.modifiedCount).toEqual(expect.any(Number));
          expect(response).toHaveProperty("matchedCount");
        });
    });
  });
});

// Notes Tests
describe.only("__Notes__", () => {
  describe("POST Note", () => {
    test("should should repsond with 401 user uid not found", () => {
      const note = {
        username: "one",
        uid: "10293809233",
        title: "Todays News",
        description: "Everything going on today",
        voice_note_url_string: "randomurl.url.com",
        img_url_str: "random_img_url.com",
        topic: "news",
      };
      return request(app)
        .post("/api/notes/post")
        .send(note)
        .expect(401)
        .then(({ body }: any) => {
          expect(body.msg).toBe("Cannot Post Note: User Does Not Exist");
        });
    });

    test("should should repsond with 401 user uid okay but topic not found", () => {
      const note = {
        username: "one",
        uid: "631917ab832ed938a5517cdb",
        title: "Todays News",
        description: "Everything going on today",
        voice_note_url_string: "randomurl.url.com",
        img_url_str: "random_img_url.com",
        topic: "noneexistent",
      };
      return request(app)
        .post("/api/notes/post")
        .send(note)
        .expect(401)
        .then(({ body }: any) => {
          expect(body.msg).toBe("Cannot Post Note: Topic Does Not Exist");
        });
    });

    test("should should repsond with 200", () => {
      const note = {
        username: "one",
        uid: "631917ab832ed938a5517cdb",
        title: "Todays News",
        description: "Everything going on today",
        voice_note_url_string: "randomurl.url.com",
        img_url_str: "random_img_url.com",
        topic: "business",
      };
      return request(app)
        .post("/api/notes/post")
        .send(note)
        .expect(200)
        .then(({ body }: any) => {
          expect(body.msg).toBe("Successfully Added New Note");
        });
    });
  });
});
