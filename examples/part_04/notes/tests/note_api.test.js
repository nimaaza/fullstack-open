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

describe('when there are initially some notes in the db', () => {
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

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');
    const contents = response.body.map(note => note.content);
    expect(contents).toContain('Browsers can execute only Javascript');
  });
});

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDB();
    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView));
    expect(resultNote.body).toEqual(processedNoteToView);
  });

  test('fails with status code 404 if note does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId();
    console.log(validNonExistingId);

    await api
      .get(`/api/notes/${validNonExistingId}`)
      .expect(404);
  });

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';
    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400);
  });
});

describe('addition of a new note', () => {
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

  test('fails with status code 400 if data invaild', async () => {
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
});

describe('deletion of a note', () => {
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
});

afterAll(() => mongoose.connection.close());
