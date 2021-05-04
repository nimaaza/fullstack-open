/* eslint-disable react-hooks/exhaustive-deps */

import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ME } from '../queries';

const BooksTable = ({ books, recommend }) => {
  const [genre, setGenre] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState(null);

  const [getUser, result] = useLazyQuery(ME);

  useEffect(() => {
    getUser();
    if (result.data && result.data.me !== null) {
      setFavoriteGenre(result.data.me.favoriteGenre);
    }
  }, [result.data]);

  const booksToDisplay = () => {
    if (recommend) {
      return books.filter(book => book.genres.includes(favoriteGenre));
    }

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

  if (booksToDisplay().length === 0) {
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
