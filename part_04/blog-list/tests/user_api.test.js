const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');

const app = require('../app');
const User = require('../models/user');
const helper = require('./helper');
const usersRouter = require('../controllers/users');

const api = supertest(app);

jest.setTimeout(10000);

describe('with only one user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({
      username: 'root',
      name: 'Nima',
      passwordHash,
    });

    await user.save();
  });

  test('creation of new user with unique username succeeds', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'nima',
      name: 'Nima',
      password: 'secret',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails if username is not unique', async () => {
    const usersBefore = await helper.usersInDb();

    const user = {
      username: 'root',
      name: 'Root',
      password: '123456',
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDb();
    expect(usersAfter).toHaveLength(usersBefore.length);
  });

  test('a list of users can be viewed', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const users = await helper.usersInDb();
    expect(response.body).toHaveLength(users.length);
  });
});

describe('test creation/deletion of users', () => {
  test('creation fails if one of username of password is missing', async () => {
    const withoutUsername = { name: 'Saba', password: 'secret' };
    const withoutPassword = { username: 'saba', name: 'Saba' };

    const usersBeforeCreation = await helper.usersInDb();

    await api
      .post('/api/users')
      .send(withoutUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/users')
      .send(withoutPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfterCreation = await helper.usersInDb();
    expect(usersAfterCreation).toHaveLength(usersBeforeCreation.length);

    const usernames = usersAfterCreation.map(user => user.username);
    expect(usernames).not.toContain('saba');
    const userNames = usersAfterCreation.map(user => user.name);
    expect(userNames).not.toContain('Saba');
  });

  test('creation fails if username or password have less than 3 chars', async () => {
    const withShortUserName = {
      username: 'ne',
      name: 'New Person',
      password: '123456',
    };

    const withShortPassword = {
      username: 'anothernewuser',
      name: 'New User',
      password: '12',
    };

    await api
      .post('/api/users')
      .send(withShortUserName)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/users')
      .send(withShortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
