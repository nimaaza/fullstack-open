import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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
      blogService.setToken(data.token);
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
    blogService.setToken(null);
    setUser(null);
  };

  const newBlogHandler = (event) => {
    event.preventDefault();

    const blog = {
      title,
      author,
      url,
    };

    blogService
      .createNew(blog)
      .then(blog => {
        const allBlogs = blogs.concat(blog);
        setBlogs(allBlogs);
      })
      .catch(error => console.error(error));
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
        <h2>Blogs</h2>
        <p>{user.name} logged in <button onClick={logoutHandler}>log out</button></p>

        <h2>create new</h2>
        <form onSubmit={newBlogHandler}>
          <div>
            title:
            <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
          </div>

          <div>
            author:
            <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
          </div>

          <div>
            url:
            <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
          </div>

          <div>
            <input type="submit" value="create" />
          </div>
        </form>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    );
  }

  return loginForm();
};

export default App;
