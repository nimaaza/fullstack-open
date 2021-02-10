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

  if (!request.body.title || !request.body.url) {
    response.status(400).end();
  } else {
    const blog = new Blog(request.body);
    const savedBlog = await blog.save();
    response.json(savedBlog);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
