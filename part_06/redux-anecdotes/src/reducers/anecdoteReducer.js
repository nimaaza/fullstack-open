const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES': {
      return action.data;
    }

    case 'VOTE': {
      const id = action.data.id;
      const votedAnecdote = state.find(a => a.id === id);
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      };

      return state.map(a => a.id === id ? updatedAnecdote : a);
    }

    case 'CREATE_NEW': {
      const newAnecdote = asObject(action.data.anecdote);
      return state.concat(newAnecdote);
    }

    default: return state;
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  };
};

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE_NEW',
    data: { anecdote },
  };
};

export default reducer;
