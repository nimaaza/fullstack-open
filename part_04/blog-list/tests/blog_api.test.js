const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./helper');

const api = supertest(app);

jest.setTimeout(10000);

const getLoginToken = async (username, password) => {
  const response = await api
    .post('/api/login')
    .send({ username, password });

  return response.body.token;
};

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogsToSave = helper.blogs.map(blog => (new Blog(blog)).save());
  await Promise.all(blogsToSave);

  await User.deleteMany({});

  await api
    .post('/api/users')
    .send({
      username: 'root',
      name: 'Nima',
      password: '123456',
    })
    .expect(200);

  await api
    .post('/api/users')
    .send({
      username: 'nima',
      name: 'Nima',
      password: '123456',
    })
    .expect(200);
});

describe('test proper returing of the blogs', () => {
  test('returns the blogs in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('returns the right number of blogs', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200);

    expect(blogs.body).toHaveLength(helper.blogs.length);
  });

  test('the unique identifier id exists for blog items', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200);

    const blog = blogs.body[Math.floor(Math.random() * blogs.body.length)];
    expect(blog.id).toBeDefined();
  });
});

describe('test proper adding and updating of blogs', () => {
  test('a valid blog can be added', async () => {
    const blog = {
      title: 'New interesting blog just added for testing, have fun!',
      author: 'Mr. Authormann',
      url: 'http://www.authors.org',
      likes: 207,
    };

    const token = await getLoginToken('root', '123456');

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogs = (await api.get('/api/blogs')).body;
    const titles = blogs.map(b => b.title);

    expect(blogs).toHaveLength(helper.blogs.length + 1);
    expect(titles).toContain('New interesting blog just added for testing, have fun!');
  });

  test('adding blog without providing a token should fails', async () => {
    const blog = {
      title: 'New interesting blog just added for testing, have fun!',
      author: 'Mr. Authormann',
      url: 'http://www.authors.org',
      likes: 207,
    };

    const blogsBefore = await Blog.find({});

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const blogsAfter = await Blog.find({});

    expect(blogsBefore).toHaveLength(blogsAfter.length);
  });

  test('a blog without a value of likes is saved with 0 likes', async () => {
    const blog = {
      title: 'New blog with no likes saved for testing',
      author: 'Mr. Authormann',
      url: 'http://www.authors.org',
    };

    const token = await getLoginToken('root', '123456');

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogs = (await api.get('/api/blogs')).body;
    const savedBlog = blogs
      .find(b => b.title === 'New blog with no likes saved for testing');
    expect(savedBlog.likes).toBe(0);
  });

  test('respond with 400 Bad Request if title and url are missing', async () => {
    const blog = {
      author: 'Mr. Authormann',
      likes: 11,
    };

    const token = await getLoginToken('root', '123456');

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(400);
  });

  test('allows changing the number of likes for a post', async () => {
    const blogs = (await api.get('/api/blogs')).body;
    const blog = blogs[Math.floor(Math.random() * blogs.length)];

    await api
      .put(`/api/blogs/${blog.id}`)
      .send({
        title: blog.title,
        url: blog.url,
        author: blog.author,
        likes: blog.likes + 1,
      });

    const blogsAfterUpdating = (await api.get('/api/blogs')).body;
    const blogAfterUpdating = blogsAfterUpdating.find(b => b.id === blog.id);

    expect(blogAfterUpdating.likes).toBe(blog.likes + 1);
  });
});

describe('test proper deletion of blogs', () => {
  test('deletes one blog successfully when owned by user', async () => {
    const token = await getLoginToken('root', '123456');
    const blog = {
      title: 'testing for proper deletion of blogs',
      author: 'Nima',
      url: 'http://test.org',
      likes: 100,
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(200);

    const savedBlog = response.body;
    const blogsBefore = await Blog.find({});
    const userBlogsBefore = (await User.findById(savedBlog.user)).blogs;

    await api
      .delete(`/api/blogs/${savedBlog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAfter = await Blog.find({});
    const userBlogsAfter = (await User.findById(savedBlog.user)).blogs;
    const titlesAfter = blogsAfter.map(b => b.title);

    expect(blogsAfter).toHaveLength(blogsBefore.length - 1);
    expect(titlesAfter).not.toContain('testing for proper deletion of blogs');
    expect(userBlogsAfter).toHaveLength(userBlogsBefore.length - 1);
    expect(userBlogsAfter).not.toContain(savedBlog.id);
  });

  test('deletion should fail if no token is provided', async () => {
    const token = await getLoginToken('root', '123456');
    const blog = {
      title: 'testing for proper deletion of blog without token',
      author: 'Nima',
      url: 'http://test.org',
      likes: 100,
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(200);

    const savedBlog = response.body;
    const blogsBefore = await Blog.find({});

    await api
      .delete(`/api/blogs/${savedBlog.id}`)
      .expect(401);

    const blogsAfter = await Blog.find({});
    expect(blogsBefore).toHaveLength(blogsAfter.length);
  });

  test('deletion should fail for blogs not owned by user', async () => {
    const tokenForRoot = await getLoginToken('root', '123456');
    const blog = {
      title: 'testing for proper deletion of blogs',
      author: 'Nima',
      url: 'http://test.org',
      likes: 100,
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${tokenForRoot}`)
      .send(blog)
      .expect(200);

    const savedBlog = response.body;
    const blogsBefore = await Blog.find({});
    const tokenForAnother = await getLoginToken('nima', '123456');

    await api
      .delete(`/api/blogs/${savedBlog.id}`)
      .set('Authorization', `Bearer ${tokenForAnother}`)
      .expect(401);

    const blogsAfter = await Blog.find({});
    const titlesAfter = blogsAfter.map(b => b.title);

    expect(blogsAfter).toHaveLength(blogsBefore.length);
    expect(titlesAfter).toContain('testing for proper deletion of blogs');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
