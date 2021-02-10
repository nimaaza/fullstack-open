const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  if (!request.body.likes) {
    request.body.likes = 0;
  }

  const blog = new Blog(request.body);

  const savedBlog = await blog.save();
  response.json(savedBlog);
});

module.exports = blogsRouter;
