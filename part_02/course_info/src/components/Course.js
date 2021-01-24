import React from 'react';

const Total = ({ parts }) => {
    const sum = parts.reduce((total, part) => total + part.exercises, 0);
    return (<h3>total of {sum} exercises</h3>);
  };
  
  const Header = ({ name }) => <h2>{name}</h2>;
  
  const Part = ({ part }) => <p>{part.name} {part.exercises}</p>;
  
  const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />);
  
  const Course = ({ course }) => (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );

  export default Course;