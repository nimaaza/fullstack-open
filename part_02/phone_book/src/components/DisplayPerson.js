import React from 'react';

const DisplayPerson = ({ name, number, deleteNumberHandler }) =>
  <p>{name} {number} <button onClick={deleteNumberHandler}>delete</button></p>

export default DisplayPerson;