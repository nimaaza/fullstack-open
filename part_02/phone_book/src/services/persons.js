import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const all = () =>
  axios
    .get(baseURL)
    .then(response => response.data);

const add = (person) =>
  axios
    .post(baseURL, person)
    .then(response => response.data);

const del = (id) =>
  axios
    .delete(`${baseURL}/${id}`);

export default { all, add, del };
