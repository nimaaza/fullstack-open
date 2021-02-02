import axios from 'axios';

const baseURL = '/api/persons';

const all = () =>
  axios
    .get(baseURL)
    .then(response => response.data);

const add = (person) =>
  axios
    .post(baseURL, person)
    .then(response => response.data);

const update = (person) =>
  axios
    .put(`${baseURL}/${person.id}`, person)
    .then(response => response.data);

const del = (id) =>
  axios
    .delete(`${baseURL}/${id}`);

export default { all, add, update, del };
