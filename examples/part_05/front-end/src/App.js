import React, { useEffect, useState } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';
import loginService from './services/login';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes));
  }, []);

  const loginForm = () => {
    return (
      <form>
        <div>
          username <input type="text"
                          value={username}
                          name="Username"
                          onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password <input type="password"
                          value={password}
                          name="Password"
                          onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const noteForm = () => {
    return (
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    );
  };

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

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Wrong credentials!');
      setTimeout(() => setErrorMessage(null), 5000);
    }
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
        setErrorMessage(`Note '${note.content}' was already removed from server.`);
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter(note => note.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {
        user === null
          ? loginForm()
          : <div>
              <p>{user.name} logged in</p>
              {noteForm()}
            </div>
      }

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

      <Footer />
    </div>
  );
};

export default App;
