import axios from 'axios';
import React, { useState, useEffect } from 'react';

import DisplayCountry from './components/DisplayCountry';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data));
  }, []);

  const queryChangeHandler = event => setQuery(event.target.value.trim());

  const countriesMatchingQuery =
    countries.filter(country =>
      country.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      find countries <input value={query} onChange={queryChangeHandler} />
      <DisplayCountry query={query} countries={countriesMatchingQuery} />
    </div>
  );
};

export default App;
