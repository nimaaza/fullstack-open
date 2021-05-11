import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import noteService from './services/notes';
import {initializeNotes} from './reducers/noteReducer';
import NoteForm from './components/NoteForm';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFiler';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    noteService
      .getAll()
      .then(notes => dispatch(initializeNotes(notes)));
  }, [dispatch]);

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
