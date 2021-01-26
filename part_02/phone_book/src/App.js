import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import Form from './components/Form';
import DisplayPerson from './components/DisplayPerson';

import personServices from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personServices
      .all()
      .then(persons => setPersons(persons));
  }, []);

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

      const person = { name: newName, number: newNumber };
      personServices
        .add(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const filterValueChange = event => setFilter(event.target.value.trim());

  const deleteNumberHandler = (id) => {
    return () => {
      const person = persons.find(person => person.id === id);
      if (!window.confirm(`Really delete ${person.name}?`)) return;

      personServices
        .del(id)
        .then(() => {
          const newPersons = persons.filter(person => person.id !== id);
          setPersons(newPersons);
        });
    };
  };

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

      {personsToShow.map(person =>
        <DisplayPerson
          key={person.name}
          name={person.name}
          number={person.number}
          deleteNumberHandler={deleteNumberHandler(person.id)} />)}
    </div>
  );
};

export default App;
