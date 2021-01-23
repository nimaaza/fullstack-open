import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => (<button onClick={onClick}>{text}</button>);

const Statistic = ({statistic, value}) => (
  <tr>
    <td>{statistic}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const noVotesMessage = '-';

  if (all === 0) {
    return (<p>No feedback given.</p>);
  }

  return (
    <div>
      <h1>Statistics</h1>

      <table>
        <tbody>
          <Statistic statistic='good' value={good} />
          <Statistic statistic='neutral' value={neutral} />
          <Statistic statistic='bad' value={bad} />
          <Statistic statistic='all' value={all} />
          <Statistic statistic='average' value={(good - bad) / all || noVotesMessage} />
          <Statistic statistic='positive' value={`${(good / all) * 100 || noVotesMessage} %`} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const voteGood = () => setGood(good + 1);
  const voteNeutral = () => setNeutral(neutral + 1);
  const voteBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1>

      <Button onClick={voteGood} text='good' />
      <Button onClick={voteNeutral} text='neutral' />
      <Button onClick={voteBad} text='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
