const User = require("../models/user");
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

const dummy = () => {
  return 1;
};

const totalLikes = (blogPosts) => {
  const arrayOfLikes = blogPosts.map((post) => post.likes);
  const reducer = (sum, item) => sum + item;

  return arrayOfLikes.length === 1
    ? arrayOfLikes[0]
    : arrayOfLikes.reduce(reducer, 0);
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  initialBlogs,
  usersInDb,
};
