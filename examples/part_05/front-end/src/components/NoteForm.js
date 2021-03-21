import React, { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('a new note...');

  const handleNoteChange = (event) => setNewNote(event.target.value);

  const addNote = (event) => {
    event.preventDefault();

    const note = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    createNote(note);
    setNewNote('');
  };

  return (
    <div className="formDiv">
      <form onSubmit={addNote}>
        <input id="new-note" value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default NoteForm;
