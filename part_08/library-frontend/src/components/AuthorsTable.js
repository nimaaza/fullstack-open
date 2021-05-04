import BirthYearForm from './BirthYearForm';

const AuthorsTable = ({ authors, notify, loggedIn }) => {
  if (authors.length === 0) {
    console.log(authors);
    return (
      <div>
        <h2>Authors</h2>
        <p>[nothing to show]</p>
      </div>
    );
  }

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

      {loggedIn ? <BirthYearForm authors={authors} notify={notify} /> : null }
    </div>
  );
};

export default AuthorsTable;
