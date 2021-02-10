const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Note = require('../models/note');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});

  const notes = helper.initialNotes
    .map(note => new Note(note));
  const savingNotes = notes.map(note => note.save());
  await Promise.all(savingNotes);

  // for (let note of helper.initialNotes) {
  //   let noteObject = new Note(note);
  //   await noteObject.save();
  // }
});

test('notes are returned as JSON', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all notes are returned', async () => {
  const response = await api.get('/api/notes');
  expect(response.body).toHaveLength(helper.initialNotes.length);
});

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes');
  const contents = response.body.map(note => note.content);
  expect(contents).toContain('Browsers can execute only Javascript');
});

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await helper.notesInDB();
  expect(response).toHaveLength(helper.initialNotes.length + 1);

  const contents = response.map(note => note.content);
  expect(contents).toContain('async/await simplifies making async calls');
});

test('note without content is not added', async () => {
  const note = {
    important: true,
  };

  await api
    .post('/api/notes')
    .send(note)
    .expect(400);

  const response = await helper.notesInDB();
  expect(response).toHaveLength(helper.initialNotes.length);
});

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDB();
  const noteToView = notesAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const processedNoteToView = JSON.parse(JSON.stringify(noteToView));
  expect(resultNote.body).toEqual(processedNoteToView);
});

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDB();
  const noteToDelete = notesAtStart[0];

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204);

  const notesAtEnd = await helper.notesInDB();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

  const contents = notesAtEnd.map(note => note.content);
  expect(contents).not.toContain(noteToDelete.content);
});

afterAll(() => mongoose.connection.close());
