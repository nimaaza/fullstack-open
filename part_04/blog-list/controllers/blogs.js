const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  if (!request.body.likes) {
    request.body.likes = 0;
  }

  const user = await User.findById(request.body.user);

  const blog = new Blog({ ...request.body, user: user._id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

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
