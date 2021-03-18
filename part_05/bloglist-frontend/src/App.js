import React, { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const newBlogFormRef = useRef();

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

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 5000);
  };

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

        showNotification({
          message: `welcome back ${data.name}`,
          error: false,
        });
      })
      .catch(error => {
        console.error('login failed:', error);
        showNotification({
          message: `login failed: ${error.message}`,
          error: true,
        });
      });
  };

  const logoutHandler = () => {
    showNotification({
      message: `bye-bye ${user.name}`,
      error: false,
    });
    window.localStorage.clear();
    blogService.setToken(null);
    setUser(null);
  };

  const createBlog = (blog) => {
    newBlogFormRef.current.toggle();

    blogService
      .createNew(blog)
      .then(blog => {
        const allBlogs = blogs.concat(blog);
        setBlogs(allBlogs);
        showNotification({
          message: `successfully added ${blog.title} from ${blog.author}`,
          error: false,
        });
      })
      .catch(error => {
        console.error(error.message);
        showNotification({
          message: `failed to add blog: ${error.message}`,
          error: true,
        });
      });
  };

  const loginForm = () => {
    return (
      <form onSubmit={loginHandler}>
        <h2>login to application</h2>
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

  const blogsToShow = blogs.sort((blog1, blog2) => blog1.likes < blog2.likes ? 1 : -1);

  const newBlogFormAndBlogs = () => {
    return (
      <div>
        <h2>Blogs</h2>

        <p>{user.name} logged in <button onClick={logoutHandler}>log out</button></p>

        <Togglable buttonLable="create new" ref={newBlogFormRef}>
          <NewBlogForm createBlog={createBlog} />
        </Togglable>

        {blogsToShow.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    );
  };

  return (
    <div>
      {
        user
          ? newBlogFormAndBlogs()
          : loginForm()
      }

      {
        notification &&
        <p className={notification.error ? 'message error' : 'message notification'}>
          {notification.message}
        </p>
      }
    </div>
  );
};

export default App;
