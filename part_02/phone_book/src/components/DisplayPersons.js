import React from 'react';

const Display = ({ name, number }) => <p>{name} {number}</p>

const DisplayPersons = ({ persons }) =>
  persons.map(person => <Display key={person.name}
                          name={person.name}
                          number={person.number} />)

export default DisplayPersons;