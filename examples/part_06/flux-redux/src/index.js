import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    case 'ZERO': return 0;
    default: return state
  }
};

const store = createStore(counterReducer);

store.subscribe(() => console.log(store.getState()));

/*
Demonstrate dispatching actions & subscribing to state changes:

console.log(store.getState());

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });

console.log(store.getState());

store.dispatch({ type: 'ZERO' });
store.dispatch({ type: 'DECREMENT' });

console.log(store.getState());

store.dispatch({ type: 'ZERO' });
*/

const renderApp = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);