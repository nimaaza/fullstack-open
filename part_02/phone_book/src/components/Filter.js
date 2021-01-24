import React from 'react';

const Filter = ({ filter, filterValueChange }) => {
  return (
    <div>
      filter with: <input value={filter} onChange={filterValueChange} />
    </div>
  );
};

export default Filter;