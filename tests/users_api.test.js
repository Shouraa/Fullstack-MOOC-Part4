const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const helper = require("./test_helper");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
});

describe("adding a user", () => {
  test("creation succeeds with a valid username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "user",
      name: "user userian",
      password: "mypassword",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with invalid password", async () => {
    const usersAtStart = helper.usersInDb();

    const invalidUser = {
      username: "nenwuser",
      name: "user userian",
      password: "av",
    };

    const result = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("password");

    const userAtEnd = await helper.usersInDb();
    expect(userAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const invalidUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails if username is invalid", async () => {
    const usersAtStart = helper.usersInDb();

    const invalidUser = {
      username: "12",
      name: "Superuser",
      password: "password",
    };

    const result = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("minimum allowed");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
