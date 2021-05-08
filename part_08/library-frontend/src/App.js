/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client';

import AuthorsTable from './components/AuthorsTable';
import BooksTable from './components/BooksTable';
import BookForm from './components/BookForm';

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';

const App = () => {
  const [token, setToken] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [books, setBooks] = useState(null);
  const [display, setDisplay] = useState('nothing');
  const [message, setMessage] = useState(null);

  const [getAuthors, returnedAuthors] = useLazyQuery(ALL_AUTHORS);
  const [getBooks, returnedBooks] = useLazyQuery(ALL_BOOKS);

  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    getAuthors();
    getBooks();
    if (returnedAuthors.data && returnedAuthors.data.allAuthors) {
      setAuthors(returnedAuthors.data.allAuthors);
    }
    if (returnedBooks.data && returnedBooks.data.allBooks) {
      setBooks(returnedBooks.data.allBooks);
    }
  }, [returnedAuthors.data, returnedBooks.data, display]);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const bookTitle = subscriptionData.data.bookAdded.title;
      const author = subscriptionData.data.bookAdded.author.name;
      const notification = `A new book has been added: ${bookTitle} by ${author}.`;
      displayMessage(notification);
    },
  });

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

    if (display === 'books' && books) {
      return <BooksTable books={books} recommend={false} />
    }

    if (display === 'recommend' && books) {
      return <BooksTable books={books} recommend={true} />
    }

    if (display === 'book_form') {
      return <BookForm notify={displayMessage} />
    }

    return null;
  };

  if (returnedAuthors.loading || returnedBooks.loading) {
    return <p>loading...</p>
  }

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
