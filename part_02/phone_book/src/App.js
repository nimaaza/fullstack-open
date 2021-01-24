import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const nameValueChange = event => setNewName(event.target.value);
  const numberValueChange = event => setNewNumber(event.target.value);
  const filterValueChange = event => setFilter(event.target.value.trim());
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
  
  const personsToShow = 
    persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter with: <input value={filter} onChange={filterValueChange} />
      </div>
      
      <h2>add a new</h2>

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

      {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  );
};

export default App;
