import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import Notify from './components/Notify';

import { ALL_PERSONS } from './queries';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const result = useQuery(ALL_PERSONS);

  // This code refreshes the cache every 2 seconds but causes
  // lots of pointless web traffic.
  // const result = useQuery(ALL_PERSONS, { pollInterval: 2000 });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 10000);
  };

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
}

export default App;
