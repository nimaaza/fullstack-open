/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const BirthYearForm = ({ notify }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
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
        <div>
          name <input type="text" value={name} onChange={({ target }) => setName(target.value)} />
        </div>

        <div>
          born <input type="text" value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>

        <input type="submit" value="update author" />
      </form>
    </div>
  );
};

export default BirthYearForm;
