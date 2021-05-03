import React, { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';

import Persons from './components/Persons';
import LoginForm from './components/LoginForm';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import Notify from './components/Notify';

import { ALL_PERSONS } from './queries';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);

  const client = useApolloClient();
  const result = useQuery(ALL_PERSONS);

  // This code refreshes the cache every 2 seconds but causes
  // lots of pointless web traffic.
  // const result = useQuery(ALL_PERSONS, { pollInterval: 2000 });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
      <button onClick={logout}>log out</button>
    </div>
  );
}

export default App;
