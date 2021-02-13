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

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id,
      request.body,
      { new: true });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
