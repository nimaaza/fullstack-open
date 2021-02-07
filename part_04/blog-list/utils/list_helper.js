const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  const reducer = (maxLikesSoFar, nextBlog) => {
    const moreLikes = nextBlog.likes > maxLikesSoFar.likes
      ? nextBlog
      : maxLikesSoFar;

    return moreLikes;
  };

  return blogs.reduce(reducer, blogs[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
