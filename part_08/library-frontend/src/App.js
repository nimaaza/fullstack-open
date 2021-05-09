/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useApolloClient, useLazyQuery } from '@apollo/client';

import AuthorsTable from './components/AuthorsTable';
import BooksTable from './components/BooksTable';
import BookForm from './components/BookForm';

import { ALL_AUTHORS } from './queries';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';

const App = () => {
  const [token, setToken] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [display, setDisplay] = useState('nothing');
  const [message, setMessage] = useState(null);

  const [getAuthors, returnedAuthors] = useLazyQuery(ALL_AUTHORS);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    getAuthors();
    if (returnedAuthors.data && returnedAuthors.data.allAuthors) {
      setAuthors(returnedAuthors.data.allAuthors);
    }
  }, [returnedAuthors.data, display]);

  const logout = () => {
    setToken(null);
    setDisplay('nothing');
    localStorage.clear();
    client.resetStore();
  };

  const login = () => setDisplay('login');

  const displayAuthors = () => setDisplay('authors');

  const displayBooks = () => setDisplay('books');

  const addBook = () => setDisplay('book_form');

  const recommend = () => setDisplay('recommend');

  const displayMessage = (notification) => {
    setMessage(notification);
    setTimeout(() => setMessage(null), 6000);
  };

  const selectView = () => {
    if (display === 'login' && !token) {
      return <LoginForm notify={displayMessage} setToken={setToken} />
    }

    if (display === 'authors' && authors) {
      return <AuthorsTable authors={authors} notify={displayMessage} loggedIn={token !== null} />
    }

    if (display === 'books') {
      return <BooksTable notify={displayMessage} recommend={false} />
    }

    if (display === 'recommend') {
      return <BooksTable notify={displayMessage} recommend={true} />
    }

    if (display === 'book_form') {
      return <BookForm notify={displayMessage} />
    }

    return null;
  };

  return (
    <div>
      <Notify message={message} />
      <button onClick={displayAuthors}>authors</button>
      <button onClick={displayBooks}>books</button>
      {token ? <button onClick={addBook}>add book</button> : <button onClick={login}>log in</button>}
      {token ? <button onClick={recommend}>recommend</button> : null}
      {token ? <button onClick={logout}>log out</button> : null}

      {selectView()}
    </div>
  );
}

export default App;
