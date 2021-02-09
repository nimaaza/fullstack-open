const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Note = require('../models/note');

const api = supertest(app);

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browsers can execute only Javascript',
    date: new Date(),
    important: true,
  },
];

beforeEach(async () => {
  await Note.deleteMany({});
  let note = new Note(initialNotes[0]);
  await note.save();
  note = new Note(initialNotes[1]);
  await note.save();
});

test('notes are returned as JSON', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two notes', async () => {
  const response = await api.get('/api/notes');
  expect(response.body).toHaveLength(initialNotes.length);
});

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes');
  const contents = response.body.map(note => note.content);
  expect(contents).toContain('Browsers can execute only Javascript');
});

afterAll(() => mongoose.connection.close());
