const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

/*require("dotenv").config();
const express = require("express");
const app = express();
const Blog = require("./models/blog");

app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.get("/api/blogs/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((returnedBlog) => {
      if (returnedBlog) {
        response.json(returnedBlog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/blogs/:id", (request, response) => {
  const id = Number(request.params.id);
  blogs = blogs.filter((blog) => blog.id !== id);

  response.status(204).end();
});

app.post("/api/blogs", (request, response) => {
  const body = request.body;
  if (body.title === undefined) {
    return response.status(400).json({
      error: "title missing",
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog.save().then((savedBlog) => {
    console.log(blog);
    response.json(blog);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
