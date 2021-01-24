import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState(
    [
      {
        name: 'Arto Hellas',
        number: 123456789
      }
    ]
  );
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const nameValueChange = event => setNewName(event.target.value);
  const numberValueChange = event => setNewNumber(event.target.value);
  const addName = (event) => {
    event.preventDefault();

    if (newName.trim().length === 0) return;
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook!`);
      return;
    }

    const person = { name: newName, number: newNumber };
    setPersons(persons.concat(person));
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={nameValueChange}/>
        </div>

        <div>
          number: <input value={newNumber} onChange={numberValueChange}/>
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  );
};

export default App;
