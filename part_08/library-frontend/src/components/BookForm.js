import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from "../queries";

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  const addGenre = (event) => {
    event.preventDefault();

    const newGenre = genre.trim();

    if (newGenre.length > 0) {
      const concatedGenres = genres.concat(newGenre);
      setGenre('');
      setGenres(concatedGenres);
    }
  };

  const submitBook = (event) => {
    event.preventDefault();

    addBook({
      variables: {
        title: title.trim(),
        author: author.trim(),
        published: Number.parseInt(published),
        genres: genres,
      },
    });

    setTitle('');
    setAuthor('');
    setPublished('');
    setGenre('');
    setGenres([]);
  };

  return (
    <form onSubmit={submitBook}>
      <div>
        title <input type='text' value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>

      <div>
        author <input type='text' value={author} onChange={(event) => setAuthor(event.target.value)} />
      </div>

      <div>
        published <input type='text' value={published} onChange={(event) => setPublished(event.target.value)} />
      </div>

      <p>
        <input type='text' value={genre} onChange={(event) => setGenre(event.target.value)} />
        <button onClick={addGenre}>add genre</button>
      </p>

      <p>genres: {genres.join(', ')}</p>

      <input type='submit' value="create book" />
    </form>
  );
};

export default BookForm;
