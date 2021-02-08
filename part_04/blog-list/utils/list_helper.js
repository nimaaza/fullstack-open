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

const mostLikes = (blogs) => {
  const authorsLikes = {};

  blogs.forEach(blog => {
    const { author, likes } = blog;
    if (authorsLikes[author]) authorsLikes[author] += likes;
    else authorsLikes[author] = likes;
  });

  const authorsList = Object.keys(authorsLikes);
  const authorWithMaxLikes = authorsList.reduce((maxLikes, nextAuthor) => {
    const moreLikes = authorsList[nextAuthor] > authorsList[maxLikes]
      ? nextAuthor
      : maxLikes;
    return moreLikes;
  }, authorsList[0]);

  return {
    author: authorWithMaxLikes,
    likes: authorsLikes[authorWithMaxLikes],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
