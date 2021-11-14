import React from 'react';

import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const displayCourse = (part: CoursePart) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <h2>{`${part.name} ${part.exerciseCount}`}</h2>
          <p>{part.description}</p>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <h2>{`${part.name} ${part.exerciseCount}`}</h2>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'submission':
      return (
        <div>
          <h2>{`${part.name} ${part.exerciseCount}`}</h2>
          <p>{part.description}</p>
          <p>{`submit to ${part.exerciseSubmissionLink}`}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h2>{`${part.name} ${part.exerciseCount}`}</h2>
          <p>{part.description}</p>
          <p>{`required skills: ${part.requirements.join(', ')}`}</p>
        </div>        
      );
    default:
      assertNever(part);
  }
};

const Part = ({ part }: { part: CoursePart }) => {
  return <div> {displayCourse(part)}</div>;
};

export default Part;
