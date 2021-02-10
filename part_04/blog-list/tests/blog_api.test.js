const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./helper');

const api = supertest(app);

jest.setTimeout(10000);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogsToSave = helper.blogs.map(blog => (new Blog(blog)).save());
  await Promise.all(blogsToSave);
});

test('returns the blogs in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('returns the right number of blogs', async () => {
  const blogs = await api.get('/api/blogs');
  expect(blogs.body).toHaveLength(helper.blogs.length);
});

test('the unique identifier id exists for blog items', async () => {
  const blogs = await api.get('/api/blogs');
  const blog = blogs.body[Math.floor(Math.random() * blogs.body.length)];
  expect(blog.id).toBeDefined();
});

test('a valid blog can be added', async () => {
  const blog = new Blog({
    title: 'New interesting blog',
    author: 'Mr. Authormann',
    url: 'http://www.authors.org',
    likes: 207,
  });

  await blog.save();
  const blogs = (await api.get('/api/blogs')).body;
  const titles = blogs.map(b => b.title);

  expect(blogs).toHaveLength(helper.blogs.length + 1);
  expect(titles).toContain('New interesting blog');
});

test('a blog without a value of likes is saved with 0 likes', async () => {
  const blog = {
    title: 'New blog with no likes saved for testing',
    author: 'Mr. Authormann',
    url: 'http://www.authors.org',
  };

  await api.post('/api/blogs').send(blog);
  const blogs = (await api.get('/api/blogs')).body;
  const savedBlog = blogs
    .find(b => b.title === 'New blog with no likes saved for testing');
  expect(savedBlog.likes).toBe(0);
});

afterAll(() => {
  mongoose.connection.close();
});
