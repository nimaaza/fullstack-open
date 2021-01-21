import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you're {props.age} years old.</p>
    </div>
  )
};

const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;
  const name = 'Nima';

  console.log('Hello from component');
  return (
    <div>
      <p>Hellow world, it is {now.toString()}.</p>

      <p>
        {a} plus {b} is {a + b}.
      </p>

      <h1>Greetings</h1>
      <Hello name={name} age={a + b}/>
      <Hello name="Saba" age={27}/>
      <Hello />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
