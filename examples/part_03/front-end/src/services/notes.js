import axios from 'axios';

const basUrl = 'http://localhost:3001/api/notes';

const getAll = () =>
  axios
    .get(basUrl)
    .then(response => response.data);

const create = newNote =>
  axios
    .post(basUrl, newNote)
    .then(response => response.data);

const update = (id, newNote) =>
  axios
    .put(`${basUrl}/${id}`, newNote)
    .then(response => response.data);

export default { getAll, create, update };