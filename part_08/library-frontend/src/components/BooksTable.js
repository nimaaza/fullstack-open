/* eslint-disable react-hooks/exhaustive-deps */

import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { BOOK_ADDED, ALL_BOOKS, ME } from '../queries';

const BooksTable = ({ recommend, notify }) => {
  const [books, setBooks] = useState(null);
  const [genre, setGenre] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState(null);

  const [getUser, userResult] = useLazyQuery(ME);
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS);
  const client = useApolloClient();

  useEffect(() => {
    getUser();
    if (userResult.data && userResult.data.me !== null) {
      setFavoriteGenre(userResult.data.me.favoriteGenre);
    }
  }, [userResult.data]);

  useEffect(() => {
    if (recommend) {
      getBooks({
        variables: { genre: favoriteGenre },
      });
    } else {
      getBooks();
    }

    if (booksResult.data && booksResult.data.allBooks) {
      setBooks(booksResult.data.allBooks);
    }
  }, [booksResult.data, favoriteGenre, recommend, genre]);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded;
      const bookTitle = bookAdded.title;
      const author = bookAdded.author.name;
      const notification = `A new book has been added: ${bookTitle} by ${author}.`;
      notify(notification);
      updateCacheWith(bookAdded);
    },
  });

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(b => b.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  const booksToDisplay = () => {
    if (genre) {
      return books.filter(book => book.genres.includes(genre));
    }

    return books;
  };

  const selectTitle = () => {
    if (recommend) {
      return <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
    } else {
      return <h2>Books</h2>;
    }
  }

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

  const genreSelectionButtons = () => {
    if (!recommend) {
      return listOfGenres().map(genre => <button key={genre} onClick={selectGenreToDisplay(genre)}>{genre}</button>);
    }

    return null;
  };

  if (booksResult.loading) {
    return <p>loading...</p>
  }

  if (!books || booksToDisplay().length === 0) {
    return (
      <div>
        {selectTitle()}
        <p>[nothing to show]</p>
      </div>
    );
  }

  return (
    <div>
      {selectTitle()}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {booksToDisplay().map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {genreSelectionButtons()}
    </div>
  );
};

export default BooksTable;
