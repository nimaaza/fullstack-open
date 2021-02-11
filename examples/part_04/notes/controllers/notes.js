const notesRouter = require('express').Router();
const User = require('../models/user');
const Note = require('../models/note');

notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.user);

  const note = new Note({
    content: request.body.content,
    important: request.body.important || false,
    date: new Date(),
    user: user._id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.json(savedNote);
});

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

notesRouter.put('/:id', async (request, response) => {
  const note = {
    content: request.body.content,
    important: request.body.important,
  };

  const updatedNote = await Note
    .findByIdAndUpdate(request.params.id, note, { new: true });
  response.json(updatedNote);
});

module.exports = notesRouter;
