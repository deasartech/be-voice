import { agent as request } from "supertest";
import chai from "chai";
const chaiSorted = require("chai-sorted");
import { faker } from "@faker-js/faker";
import { app } from "../../index";
import {
  connectMongoose,
  disconnectMongoose,
} from "../../services/database.service";
import { ITopic } from "../../models/topics.model";
import { IUser } from "../../models/users.model";
import { INote, INoteUpdatePost, NoteUser } from "../../models/notes.model";

beforeAll(async () => await connectMongoose());

afterAll(async () => await disconnectMongoose());

const expect = chai.expect;
chai.use(chaiSorted);

// Topics Tests

describe("__Topics__", () => {
  describe("GET /topics", () => {
    test("should return all topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }: any) => {
          const { topics } = body;
          expect(topics).instanceOf(Array);
          topics.forEach((topic: ITopic) => {
            expect(topic).to.have.property("description");
            expect(topic).to.have.property("slug");
            expect(topic._id).to.be.a("string");
            expect(topic.description).to.be.a("string");
            expect(topic.slug).to.be.a("string");
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
          expect(body.msg).to.equal("Topic Not Found");
        });
    });

    test("should return a topic if ':word' is valid ", () => {
      return request(app)
        .get("/api/topics/comedy")
        .expect(200)
        .then(({ body }: any) => {
          const { topic } = body;
          console.log(topic);
          expect(topic).instanceOf(Array);
          expect(topic).to.have.lengthOf(1);
          const obj = topic[0];
          expect(obj).instanceOf(Object);
          expect(obj).to.have.property("_id");
          expect(obj).to.have.property("description");
          expect(obj).to.have.property("slug");
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
          expect(users).instanceOf(Array);
          users.forEach((user: IUser) => {
            expect(user).to.have.property("_id");
            expect(user).to.have.property("uid");
            expect(user).to.have.property("email");
            expect(user).to.have.property("username");
            expect(user.details).to.have.property("first_name");
            expect(user.details).to.have.property("last_name");
            expect(user.details).to.have.property("date_of_birth");
            expect(user.details).to.have.property("phone_number");
            expect(user).to.have.property("created_at");
            expect(user).to.have.property("description");
            expect(user).to.have.property("subscribers_count");
            expect(user).to.have.property("notes_count");
            expect(user).to.have.property("favorites_count");
            expect(user).to.have.property("replies_count");
            expect(user).to.have.property("time_zone");
            expect(user).to.have.property("location");
            expect(user).to.have.property("lang");
            expect(user).to.have.property("profile_photo_image_url");
            expect(user).to.have.property("profile_color");
            expect(user).to.have.property("subscriptions");
            expect(user).to.have.property("protected");
            expect(user).to.have.property("verified");
            expect(user._id).to.be.a("string");
            expect(user.email).to.be.a("string");
            expect(user.username).to.be.a("string");
            expect(user.created_at).to.be.a("number");
            expect(user.subscribers_count).to.be.a("number");
            expect(user.notes_count).to.be.a("number");
            expect(user.favorites_count).to.be.a("number");
            expect(user.replies_count).to.be.a("number");
            expect(user.lang).to.be.a("string");
            expect(user.subscriptions).to.be.a("array");
            expect(user.protected).to.be.a("boolean");
            expect(user.verified).to.be.a("boolean");
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
          expect(body.msg).to.equal("User Not Found");
        });
    });

    test("should return a user if ':username' is valid ", () => {
      return request(app)
        .get("/api/users/one")
        .expect(200)
        .then(({ body }: any) => {
          const { user } = body;
          console.log(user);
          expect(user).instanceOf(Object);
          expect(user).to.have.property("_id");
          expect(user).to.have.property("uid");
          expect(user).to.have.property("email");
          expect(user).to.have.property("username");
          expect(user).to.have.property("created_at");
          expect(user).to.have.property("description");
          expect(user).to.have.property("subscribers_count");
          expect(user).to.have.property("notes_count");
          expect(user).to.have.property("favorites_count");
          expect(user).to.have.property("replies_count");
          expect(user).to.have.property("time_zone");
          expect(user).to.have.property("location");
          expect(user).to.have.property("lang");
          expect(user).to.have.property("profile_photo_image_url");
          expect(user).to.have.property("profile_color");
          expect(user).to.have.property("subscriptions");
          expect(user).to.have.property("protected");
          expect(user).to.have.property("verified");
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
          expect(response).instanceOf(Object);
          expect(response.acknowledged).to.equal(true);
          expect(response.modifiedCount).to.be.a("number");
          expect(response).to.have.property("matchedCount");
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
          expect(response).instanceOf(Object);
          expect(response.acknowledged).to.equal(true);
          expect(response.modifiedCount).to.equal(1);
          expect(response.matchedCount).to.equal(1);
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
          expect(response).instanceOf(Object);
          expect(response.acknowledged).to.equal(true);
          expect(response.modifiedCount).to.be.a("number");
          expect(response).to.have.property("matchedCount");
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
          expect(msg).to.equal("Error Not Authorized: Details not complete");
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
          expect(response).instanceOf(Object);
          expect(response.acknowledged).to.equal(true);
          expect(response.modifiedCount).to.be.a("number");
          expect(response).to.have.property("matchedCount");
        });
    });
  });

  describe("PATCH /users/:uid/subscribe", () => {
    test("should respond 400 if uid does not exist", () => {
      // ARRANGE
      const user = { email: "one@test.com", password: "test123" };
      // ACT
      return request(app)
        .post("/api/auth/connect")
        .send(user)
        .expect(200)
        .then(function (res) {
          return request(app)
            .patch("/api/users/6kjsdfklnone/subscribe")
            .send()
            .expect(400);
        })
        .then((res) => {
          console.log(res, "res here");
        });
    });

    test("should sign in user and then subsribe to user and unsubscribe", () => {
      // ARRANGE
      const user = { email: "deant@test.com", password: "test123" };
      const subscribe = { action: "subscribe" };
      const unsubscribe = { action: "unsubscribe" };
      // ACT
      return request(app)
        .post("/api/auth/connect")
        .send(user)
        .expect(200)
        .then(function (res) {
          return request(app)
            .patch("/api/users/631917ab832ed938a5517cdb/subscribe")
            .send(subscribe)
            .expect(200)
            .then(function (res) {
              return request(app)
                .patch("/api/users/631917ab832ed938a5517cdb/subscribe")
                .send(unsubscribe)
                .expect(200);
            });
        });
    });
  });
});

// Notes Tests

describe("__Notes__", () => {
  let TEMP_DEL_ID = "";

  describe("GET Notes", () => {
    test("should return 200", () => {
      return request(app).get("/api/notes").expect(200);
    });

    test("should return 200 all notes and check properties", () => {
      return request(app)
        .get("/api/notes")
        .expect(200)
        .then(({ body }: any) => {
          const { notes } = body;
          expect(notes).instanceOf(Array);
          notes.forEach((note: INote) => {
            expect(note._id).to.be.a("string");
            expect(note.created_at).to.be.a("number");
            expect(note.description).to.be.a("string");
            expect(note.voice_note_url_string).to.be.a("string");
            expect(note.img_url_str).to.be.a("string");
            expect(note.user.uid).to.be.a("string");
            expect(note.user.username).to.be.a("string");
            expect(note.comments_count).to.be.a("number");
            expect(note.cheers_count).to.be.a("number");
            expect(note.topic).to.be.a("string");
          });
        });
    });

    test("should check sorted by comments_count in asc order", () => {
      // ACT
      return request(app)
        .get("/api/notes?sort_by=comments_count&order=asc")
        .expect(200)
        .then(({ body }: any) => {
          const { notes } = body;
          const copy = [...notes];
          const manualSort = copy.sort(
            (a: INote, b: INote) => a.comments_count - b.comments_count
          );
          // ASSERT
          expect(notes).to.be.a("array");
          expect(notes).to.eql(manualSort);
        });
    });

    test("should check sorted by comments_count in desc order", () => {
      // ACT
      return request(app)
        .get("/api/notes?sort_by=comments_count&order=desc")
        .expect(200)
        .then(({ body }: any) => {
          const { notes } = body;
          const copy = [...notes];
          const manualSort = copy.sort(
            (a: INote, b: INote) => b.comments_count - a.comments_count
          );
          // ASSERT
          expect(notes).to.be.a("array");
          expect(notes).to.eql(manualSort);
        });
    });

    test("should check sorted by cheers_count in asc order", () => {
      // ACT
      return request(app)
        .get("/api/notes?sort_by=cheers_count&order=asc")
        .expect(200)
        .then(({ body }: any) => {
          const { notes } = body;
          const copy = [...notes];
          const manualSort = copy.sort(
            (a: INote, b: INote) => a.cheers_count - b.cheers_count
          );
          // ASSERT
          expect(notes).to.be.a("array");
          expect(notes).to.eql(manualSort);
        });
    });

    test("should check sorted by cheers_count in desc order", () => {
      // ACT
      return request(app)
        .get("/api/notes?sort_by=cheers_count&order=desc")
        .expect(200)
        .then(({ body }: any) => {
          const { notes } = body;
          const copy = [...notes];
          const manualSort = copy.sort(
            (a: INote, b: INote) => b.cheers_count - a.cheers_count
          );
          // ASSERT
          expect(notes).to.be.a("array");
          expect(notes).to.eql(manualSort);
        });
    });

    test("should respond 400 topic not found", () => {
      // ACT
      return request(app)
        .get("/api/notes?topic=doesnotexist")
        .expect(400)
        .then(({ body }: any) => {
          const { msg } = body;
          // ASSERT
          expect(msg).to.equal("Topic Not Found");
        });
    });

    test("should respond 400 topic not found", () => {
      // ACT
      return request(app)
        .get("/api/notes?sort_by=cheers_count&order=desc&topic=busine")
        .expect(400)
        .then(({ body }: any) => {
          const { msg } = body;
          // ASSERT
          expect(msg).to.equal("Topic Not Found");
        });
    });

    test("should check sorted by cheers_count in desc order and topic exists", () => {
      // ACT
      return request(app)
        .get("/api/notes?sort_by=cheers_count&order=desc&topic=business")
        .expect(200)
        .then(({ body }: any) => {
          const { notes } = body;
          const copy = [...notes];
          const manualSort = copy.sort(
            (a: INote, b: INote) => b.cheers_count - a.cheers_count
          );
          // ASSERT
          expect(notes).to.be.a("array");
          expect(notes).to.eql(manualSort);
        });
    });

    test("should respond 200 by topic and default created_at desc order", () => {
      // ACT
      return request(app)
        .get("/api/notes?topic=business")
        .expect(200)
        .then(({ body }: any) => {
          const { notes } = body;
          const copy = [...notes];
          const manualSort = copy.sort(
            (a: INote, b: INote) => b.created_at - a.created_at
          );
          // ASSERT
          expect(notes).to.be.a("array");
          expect(notes).to.eql(manualSort);
        });
    });

    test("should respond 200 by topic and default created_at desc order", () => {
      // ACT
      return request(app)
        .get("/api/notes?topic=business&sort_by=created_at&order=asc")
        .expect(200)
        .then(({ body }: any) => {
          const { notes } = body;
          const copy = [...notes];
          const manualSort = copy.sort(
            (a: INote, b: INote) => a.created_at - b.created_at
          );
          // ASSERT
          expect(notes).to.be.a("array");
          expect(notes).to.eql(manualSort);
        });
    });
  });

  describe("GET Note", () => {
    test("should respond 400 if note id invalid", () => {
      return request(app).get("/api/notes/lolwrongid").expect(400);
    });

    test("should return 400 if note id invalid", () => {
      return request(app).get("/api/notes/00000000").expect(400);
    });

    test("should respond 401 if note not found", () => {
      // ACT
      return request(app)
        .get("/api/notes/231cff3be052d31e3a6170c7")
        .expect(401)
        .expect("Content-type", "application/json; charset=utf-8")
        .then(({ body }) => {
          const { msg } = body;
          // ASSERT
          expect(msg).to.equal("Note Not Found");
        });
    });

    test("should return 200 with note and msg", () => {
      // ACT
      return request(app)
        .get("/api/notes/6329b03e6ce5816293d96a9e")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          const { res, msg } = body;
          // ASSERT
          expect(res._id).to.equal("6329b03e6ce5816293d96a9e");
          expect(res.created_at).to.equal(1663676478197);
          expect(res.description).to.equal("The Burr special");
          expect(res.voice_note_url_string).to.equal("randomurl.url.com");
          expect(res.img_url_str).to.equal("random_img_url.com");
          expect(res.user.uid).to.equal("631917ab832ed938a5517cdb");
          expect(res.user.username).to.equal("one");
          expect(res.comments_count).to.equal(0);
          expect(res.cheers_count).to.equal(0);
          expect(res.topic).to.equal("comedy");
          expect(msg).to.equal("Successfully Found Note");
        });
    });
  });

  describe("POST Note", () => {
    test("should should respond with 401 user uid not found", () => {
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
          expect(body.msg).to.equal("Cannot Post Note: User Does Not Exist");
        });
    });

    test("should should respond with 401 user uid okay but topic not found", () => {
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
          expect(body.msg).to.equal("Cannot Post Note: Topic Does Not Exist");
        });
    });

    test("should should respond with 200", () => {
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
          const { res, msg } = body;
          TEMP_DEL_ID = res._id;
          expect(msg).to.equal("Successfully Added New Note");
        });
    });
  });

  describe("PATCH Note", () => {
    test("should respond with 400 if id is not valid", () => {
      const update = {
        title: "new title",
        description: "new description",
      };
      return request(app)
        .patch("/api/notes/631d0061b8396ab9e006f909")
        .send(update)
        .expect(400);
    });

    test("should respond with 400 if body contains title, desc, cheers and comments", () => {
      const update = {
        title: "new title",
        description: "new description",
        cheers_count: "1",
        comments_count: "1",
      };
      return request(app)
        .patch("/api/notes/631d0061b8396ab9eda6f909")
        .send(update)
        .expect(400);
    });

    test("should respond 200 if body contains title, desc & note_id is valid", () => {
      const update = {
        title: "new title",
        description: "new description",
      };
      return request(app)
        .patch("/api/notes/6329b06d6ce5816293d96ab0")
        .send(update)
        .expect(200);
    });

    test("should respond 200 if body contains cheers count & note_id is valid", () => {
      const update = {
        cheers_count: "1",
      };
      return request(app)
        .patch("/api/notes/6329b06d6ce5816293d96ab0")
        .send(update)
        .expect(200);
    });

    test("should respond 200 if body contains comments count & note_id is valid", () => {
      const update = {
        comments_count: "1",
      };
      return request(app)
        .patch("/api/notes/6329b06d6ce5816293d96ab0")
        .send(update)
        .expect(200);
    });
  });

  describe("DEL Note", () => {
    test("should respond status 400 if note id does not exist", () => {
      return request(app).delete("/api/notes/555555").expect(400);
    });

    test("should respond status 200 if removed", () => {
      return request(app)
        .delete(`/api/notes/${TEMP_DEL_ID}`)
        .expect(200)
        .then(({ body }) => {
          const { res, msg } = body;
          expect(res.acknowledged).to.equal(true);
          expect(res.deletedCount).to.equal(1);
          expect(msg).to.equal("Successfully Deleted Note");
        });
    });
  });
});
