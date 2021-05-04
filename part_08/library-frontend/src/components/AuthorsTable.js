const AuthorsTable = ({ authors }) => {
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => {
            return (
              <tr key={author.id}>
                <td>{author.name}</td>
                <td>{author.born}</td>
                <td>{author.bookCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorsTable;
