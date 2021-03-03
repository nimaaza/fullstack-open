import axios from 'axios';

const basUrl = '/api/notes';
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () =>
  axios
    .get(basUrl)
    .then(response => response.data);

const create = newNote => {
  const config = {
    headers: { Authorization: token },
  };

  return axios
    .post(basUrl, newNote, config)
    .then(response => response.data);
};

const update = (id, newNote) =>
  axios
    .put(`${basUrl}/${id}`, newNote)
    .then(response => response.data);

export default { getAll, create, update, setToken };
