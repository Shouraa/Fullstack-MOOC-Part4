const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogPosts) => {
  const arrayOfLikes = blogPosts.map((post) => post.likes);
  const reducer = (sum, item) => sum + item;

  return arrayOfLikes.length === 1
    ? arrayOfLikes[0]
    : arrayOfLikes.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
