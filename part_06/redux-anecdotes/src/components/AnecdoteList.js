import { useDispatch, useSelector } from 'react-redux';

import { voteAnecdote } from '../reducers/anecdoteReducer';
import { eraseNotification, setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter(a => a.content.toLowerCase().includes(filter.trim().toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  });

  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id);
    const notification = `you voted for '${anecdote.content}'`;
    dispatch(setNotification(notification));
    dispatch(voteAnecdote(id));

    setTimeout(() => {
      dispatch(eraseNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;
