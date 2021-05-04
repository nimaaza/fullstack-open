/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const BirthYearForm = ({ authors, notify }) => {
  const [name, setName] = useState(authors[0].name);
  const [born, setBorn] = useState('');

  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => notify(error.graphQLErrors[0].message),
  });

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      notify('author not found');
    }
  }, [result.data]);

  const submitAuthor = (event) => {
    event.preventDefault();

    editAuthor({
      variables: {
        name: name.trim(),
        setBornTo: Number.parseInt(born),
      },
    });
  };

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submitAuthor}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map(author => <option value={author.name} key={author.name}>{author.name}</option>)}
        </select>

        <div>
          born <input type="text" value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>

        <input type="submit" value="update author" />
      </form>
    </div>
  );
};

export default BirthYearForm;
