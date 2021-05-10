import { createNote, toggleImportanceOf } from './reducers/noteReducer';

const App = ({ store }) => {
  const addNote = (event) => {
    event.preventDefault();

    const content = event.target.note.value;
    event.target.note.value = '';
    store.dispatch(createNote(content));
  };

  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>

      <ul>
        {store.getState().map(note =>
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
