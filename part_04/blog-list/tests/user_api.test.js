const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');

const app = require('../app');
const User = require('../models/user');
const helper = require('./helper');

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

  test('a list of users can be viewed', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const users = await helper.usersInDb();
    expect(response.body).toHaveLength(users.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
