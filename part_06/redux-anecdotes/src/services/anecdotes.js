import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const anecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const update = async (anecdote) => {
  const url = `${baseUrl}/${anecdote.id}`;
  const updatedAnecdote = await axios.put(url, anecdote);
  return updatedAnecdote.data;
};

export default { getAll, createNew, update };
