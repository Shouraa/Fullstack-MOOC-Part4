const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");
const initialBlogs = [
  {
    title: "Javascript",
    author: "Andy",
    url: "www.jdjdjd.com",
    likes: 87,
  },
  {
    title: "GraphQL",
    author: "Bobby",
    url: "www.www.www",
    likes: 9,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
