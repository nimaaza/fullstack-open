import { useEffect, useState } from 'react';
import { useApolloClient, useLazyQuery } from '@apollo/client';

import AuthorsTable from './components/AuthorsTable';
import BooksTable from './components/BooksTable';
import BookForm from './components/BookForm';

import { ALL_AUTHORS, ALL_BOOKS } from './queries';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';

const App = () => {
  const [token, setToken] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [books, setBooks] = useState(null);
  const [display, setDisplay] = useState('nothing');
  const [message, setMessage] = useState(null);
  const [genre, setGenre] = useState(null);

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
    if (display === 'authors' && returnedAuthors.data && returnedAuthors.data.allAuthors) {
      setAuthors(returnedAuthors.data.allAuthors);
    } else if (display === 'books' && returnedBooks.data && returnedBooks.data.allBooks) {
      setBooks(returnedBooks.data.allBooks);
    }
  }, [returnedAuthors.data, returnedBooks.data, display]);

  const login = () => setDisplay('login');

  const logout = () => {
    setToken(null);
    setDisplay('nothing');
    localStorage.clear();
    client.resetStore();
  };

  const displayAuthors = () => {
    getAuthors();
    setBooks(null);
    setDisplay('authors');
  };

  const displayBooks = () => {
    getBooks();
    setAuthors(null);
    setDisplay('books');
  }

  const addBook = () => {
    setAuthors(null);
    setBooks(null);
    setDisplay('book_form');
  };

  const displayMessage = (notification) => {
    setMessage(notification);
    setTimeout(() => setMessage(null), 6000);
  };

  const booksToDisplay = () => {
    if (genre) {
      return books.filter(book => book.genres.includes(genre));
    }

    return books;
  };

  const listOfGenres = () => {
    if (books) {
      const genres = ['All'];
      books.forEach((book) => {
        book.genres.forEach((genre) => {
          if (!genres.includes(genre)) genres.push(genre);
        })
      });

      return genres;
    }

    return [];
  }

  const selectGenreToDisplay = (genre) => {
    if (genre === 'All') {
      return () => setGenre(null);
    }

    return () => setGenre(genre);
  };

  const selectDisplay = () => {
    if (display === 'login' && !token) {
      return <LoginForm notify={displayMessage} setToken={setToken} />
    }

    if (display === 'authors' && authors) {
      return <AuthorsTable authors={authors} notify={displayMessage} loggedIn={token !== null} />
    }

    if (display === 'books' && books) {
      return <BooksTable books={booksToDisplay()} />
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
      {token ? <button onClick={logout}>log out</button> : null}

      {selectDisplay()}

      {listOfGenres().map(genre => <button key={genre} onClick={selectGenreToDisplay(genre)}>{genre}</button>)}
    </div>
  );
}

export default App;
