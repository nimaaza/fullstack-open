import React, { useEffect, useState } from 'react';
import Note from './components/Note';
import noteService from './services/notes';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes));
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    const note = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteService
      .create(note)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      }
    );
  };

  const handleNoteChange = event => setNewNote(event.target.value);

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id);
    const updatedNote = { ...note, important: !note.important };

    noteService
      .update(id, updatedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        alert(`the note has already been deleted from server`);
        setNotes(notes.filter(note => note.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button> 
      </div>

      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;
