import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas' }]);
  const [ newName, setNewName ] = useState('')

  const nameValueChange = event => setNewName(event.target.value);

  const addName = (event) => {
    event.preventDefault();
    if (newName.trim().length > 0) {
      const person = { name: newName };
      setPersons(persons.concat(person));
      setNewName('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={nameValueChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  );
};

export default App;
