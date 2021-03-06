import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import Form from './components/Form';
import DisplayPerson from './components/DisplayPerson';
import Notification from './components/Notification';

import personServices from './services/persons';

import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState([null, false]);

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

      const person = persons.find(person => person.name === newName);

      if (person) {
        if (window.confirm(`${newName} is already in the phonebook! Update number?`)) {
          const newPerson = { ...person, number: newNumber };
          personServices
            .update(newPerson)
            .then(response => {
              const newPersons = persons.map(person => person.id === response.id ? response : person);
              setPersons(newPersons);
              setNotification([`Phone number of ${person.name} successfully updated!`, false]);
            })
            .catch(error => setNotification([error.response.data.error, true]));
        }
      } else {
        const newPerson = { name: newName, number: newNumber };
        personServices
          .add(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));
            setNotification([`New phone number for ${newPerson.name} successfully added!`, false]);
          })
          .catch(error => setNotification([error.response.data.error, true]));
      }

      setNewName('');
      setNewNumber('');
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
          setNotification([`Phone number of ${person.name} deleted!`, true]);
        }).catch(error => {
          setNotification([`Information for this person does not exist on the server!`, true])
        });
    };
  };

  const personsToShow =
    persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase()));

  setTimeout(() => {setNotification([null, false])}, 10000);

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification[0]} error={notification[1]} />

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
