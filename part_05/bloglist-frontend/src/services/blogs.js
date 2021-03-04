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
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

export default { getAll, createNew, setToken };
