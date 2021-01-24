import React, { useState } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import DisplayPersons from './components/DisplayPersons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const formActionListeners = {
    nameValueChange: event => setNewName(event.target.value),
    numberValueChange: event => setNewNumber(event.target.value),
    addName: event => {
      event.preventDefault();
      
      if (newName.trim().length === 0) return;
      if (persons.find(person => person.name === newName)) {
        alert(`${newName} is already in the phonebook!`);
        return;
      }
      
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    }
  };

  const filterValueChange = event => setFilter(event.target.value.trim());

  const personsToShow =
    persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} filterValueChange={filterValueChange} />

      <h2>add a new</h2>

      <Form formActionListeners={formActionListeners}
        newName={newName}
        newNumber={newNumber} />

      <h2>Numbers</h2>

      <DisplayPersons persons={personsToShow} />
    </div>
  );
};

export default App;
