import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  if (newToken) {
    token = `Bearer ${newToken}`;
  } else {
    token = null;
  }
};

const createNew = (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  return axios
    .post(baseUrl, blog, config)
    .then(response => response.data);
}

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data);
};

const updateBlog = (blog) => {
  axios
    .put(`${baseUrl}/${blog.id}`, blog)
    .then(response => response.data);
};

export default { getAll, createNew, updateBlog, setToken };
