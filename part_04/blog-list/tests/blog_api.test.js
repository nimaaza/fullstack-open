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
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.blogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
