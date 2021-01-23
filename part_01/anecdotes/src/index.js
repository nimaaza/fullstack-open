import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({title, anecdote, votes}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes </p>
    </div>
  );
};

const Button = ({onClick, text}) =>
  (<button onClick={onClick}>{text}</button>);

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0));

  const setNextAnecdote = () => {
    const nextAnecdote = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(nextAnecdote);
  };

  const vote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  let max = points[0];
  let maxIndex = 0;

  points.forEach((point, index) => {
      if (point > max) {
        max = point;
        maxIndex = index;
      }
    }
  );

  return (
    <div>
      <Display title='Anecdote of the day' anecdote={props.anecdotes[selected]} votes={points[selected]} />

      <Button onClick={vote} text='vote' />
      <Button onClick={setNextAnecdote} text='next anecdote' />

      <Display title='Anecdote with most votes' anecdote={props.anecdotes[maxIndex]} votes={points[maxIndex]} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);
