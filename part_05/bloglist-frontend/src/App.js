import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = window.localStorage.getItem('loginUser');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs));
  }, []);

  const loginHandler = (event) => {
    event.preventDefault();

    loginService.login({
      username,
      password,
    })
    .then(data => {
      window.localStorage.setItem('loginUser', JSON.stringify(data));
      setUser(data);
      setUsername('');
      setPassword('');
    })
    .catch(error => {
      console.error('login failed:', error);
    });
  };

  const logoutHandler = (event) => {
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => {
    return (
      <form onSubmit={loginHandler}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Name"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <input type="submit" value="login" />
        </div>
      </form>
    );
  };

  if (user) {
    return (
      <div>
        <p>{user.name} logged in <button onClick={logoutHandler}>log out</button></p>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    );
  }

  return loginForm();
};

export default App;
