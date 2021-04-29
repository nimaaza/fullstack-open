import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import AuthorsTable from './components/AuthorsTable';
import BooksTable from './components/BooksTable';

import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const App = () => {
  const [authors, setAuthors] = useState(null);
  const [books, setBooks] = useState(null);
  const [showAuthors, setShowAuthors] = useState(false);

  const [getAuthors, returnedAuthors] = useLazyQuery(ALL_AUTHORS);
  const [getBooks, returnedBooks] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (showAuthors && returnedAuthors.data && returnedAuthors.data.allAuthors) {
      setAuthors(returnedAuthors.data.allAuthors);
    } else if (returnedBooks.data && returnedBooks.data.allBooks) {
      setBooks(returnedBooks.data.allBooks);
    }
  }, [returnedAuthors.data, returnedBooks.data, showAuthors]);

  const displayAuthors = () => {
    getAuthors();
    setBooks(null);
    setShowAuthors(true);
  };

  const displayBooks = () => {
    getBooks();
    setAuthors(null);
    setShowAuthors(false);
  }

  const displayData = () => {
    if (authors && showAuthors) {
      return <AuthorsTable authors={authors} />
    }

    if (books && !showAuthors) {
      return <BooksTable books={books} />
    }

    return null;
  };

  return (
    <div>
      <button onClick={displayAuthors}>authors</button>
      <button onClick={displayBooks}>books</button>
      {displayData()}
    </div>
  );
}

export default App;
