import { useDispatch } from "react-redux";

import { createAnecdote } from '../reducers/anecdoteReducer';
import { eraseNotification, setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    dispatch(setNotification('A new anecdote added!'));
    dispatch(createAnecdote(content));
    setTimeout(() => dispatch(eraseNotification()), 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input type='text' name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
