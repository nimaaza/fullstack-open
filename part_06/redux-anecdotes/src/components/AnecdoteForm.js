import { connect } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const addAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    createAnecdote(content);
    setNotification('A new anecdote added!', 5);
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
