import anecdoteService from '../services/anecdotes';

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

    case 'CREATE_NEW': return state.concat(action.data);

    default: return state;
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'CREATE_NEW',
      data: anecdote,
    });
  };
};

export default reducer;
