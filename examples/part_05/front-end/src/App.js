import React, { useEffect, useState, useRef } from 'react';

import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import NoteForm from './components/NoteForm';
import LoginForm from './components/LoginForm';

import noteService from './services/notes';
import loginService from './services/login';
import Togglable from './components/Togglable';

const App = () => {
  const noteFormRef = useRef();

  const [notes, setNotes] = useState([]);
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

  useEffect(() => {
    const loggedInNoteAppUser = window.localStorage.getItem('loggedInNoteAppUser');
    if (loggedInNoteAppUser) {
      const user = JSON.parse(loggedInNoteAppUser);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const createNote = (note) => {
    noteFormRef.current.toggleVisibility();
    noteService
      .create(note)
      .then(returnedNote => setNotes(notes.concat(returnedNote)));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedInNoteAppUser',
        JSON.stringify(user),
      );

      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Wrong credentials!');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInNoteAppUser');
    noteService.setToken('');
    setUser(null);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id);
    const updatedNote = { ...note, important: !note.important };

    noteService
      .update(id, updatedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(() => {
        setErrorMessage(`Note '${note.content}' was already removed from server.`);
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter(note => note.id !== id));
      });
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Togglable>
    );
  };

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={createNote} />
      </Togglable>
    );
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
            <p>
              {user.name} logged in
              <button onClick={handleLogout}>log out</button>
            </p>
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
