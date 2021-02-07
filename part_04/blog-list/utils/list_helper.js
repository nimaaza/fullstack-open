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

const mostBlogs = (blogs) => {
  const authors = {};

  blogs.forEach(blog => {
    if (authors[blog.author]) authors[blog.author] += 1;
    else authors[blog.author] = 1;
  });

  const authorsList = Object.keys(authors);
  const authorWithMaxBlogs = authorsList.reduce((maxBlogs, nextAuthor) => {
    const moreBlogs = authors[nextAuthor] > authors[maxBlogs]
      ? nextAuthor : maxBlogs;
    return moreBlogs;
  }, authorsList[0]);

  return {
    author: authorWithMaxBlogs,
    blogs: authors[authorWithMaxBlogs],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
