import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import AuthorsTable from './components/AuthorsTable';
import BooksTable from './components/BooksTable';
import BookForm from './components/BookForm';

import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const App = () => {
  const [authors, setAuthors] = useState(null);
  const [books, setBooks] = useState(null);
  const [display, setDisplay] = useState('nothing');

  const [getAuthors, returnedAuthors] = useLazyQuery(ALL_AUTHORS);
  const [getBooks, returnedBooks] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (display === 'authors' && returnedAuthors.data && returnedAuthors.data.allAuthors) {
      setAuthors(returnedAuthors.data.allAuthors);
    } else if (display === 'books' && returnedBooks.data && returnedBooks.data.allBooks) {
      setBooks(returnedBooks.data.allBooks);
    }
  }, [returnedAuthors.data, returnedBooks.data, display]);

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

  const displayData = () => {
    if (display === 'authors' && authors) {
      return <AuthorsTable authors={authors} />
    }

    if (display === 'books' && books) {
      return <BooksTable books={books} />
    }

    if (display === 'book_form') {
      return <BookForm />
    }

    return null;
  };

  return (
    <div>
      <button onClick={displayAuthors}>authors</button>
      <button onClick={displayBooks}>books</button>
      <button onClick={addBook}>add book</button>
      {displayData()}
    </div>
  );
}

export default App;
