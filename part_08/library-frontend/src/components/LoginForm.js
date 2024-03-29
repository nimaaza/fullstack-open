/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({ notify, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: error => notify(error.graphQLErrors[0].message),
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
    }
  }, [result.data]);

  const submit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  }

  return (
    <form onSubmit={submit}>
      <div>
        username <input value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>

      <div>
        password <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>

      <input type='submit' value='Log in' />
    </form>
  );
};


export default LoginForm;
