const initialFilter = '';

const filterReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case 'FILTER': return action.filter;
    default: return state;
  }
};

export const setNewFilter = (filter) => {
  return {
    type: 'FILTER',
    filter,
  };
};

export default filterReducer;
