import React from 'react';
import ReactDOM from 'react-dom';

const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {name}</h1>
};

const element = <Welcome name="Sara" />;

ReactDOM.render(element, document.getElementById('root'));
