import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import noteReducer from './reducers/noteReducer';
import App from './App';

const store = createStore(noteReducer);

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2,
  },
});

const renderApp = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
