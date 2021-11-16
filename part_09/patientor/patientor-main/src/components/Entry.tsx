import React from "react";
import { useStateValue } from "../state";
import { Icon } from "semantic-ui-react";

import { Entry } from "../types";

const style = {
  border: 1,
  borderColor: 'lightgray',
  borderStyle: 'solid',
  padding: 8,
  borderRadius: 8,
  margin: 8,
};

const PatientEntry = ({ entry }: { entry: Entry }) => {
  const [state,] = useStateValue();

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const drawHeading = (e: Entry) => {
    switch (e.type) {
      case 'HealthCheck':
        return <h3>{entry.date} {drawIcon(entry)}</h3>;
      case 'OccupationalHealthcare':
        return <h3>{entry.date} {drawIcon(entry)} {e.employerName}</h3>;
      case 'Hospital':
        return <h3>{entry.date} {drawIcon(entry)}</h3>;
      default:
        return assertNever(e);
    }
  };

  const drawIcon = (e: Entry) => {
    switch (e.type) {
      case 'HealthCheck':
        return <Icon name='doctor' />;
      case 'OccupationalHealthcare':
        return <Icon name='stethoscope' />;
      case 'Hospital':
        return null;
      default:
        return assertNever(e);
    }
  };

  const drawHealthRating = (e: Entry) => {
    switch (e.type) {
      case 'HealthCheck':
        let healthRatingStyle;
        if (e.healthCheckRating === 0) {
          healthRatingStyle = { color: 'green' };
        } else if (e.healthCheckRating === 1 || e.healthCheckRating === 2) {
          healthRatingStyle = { color: 'orange' };
        } else {
          healthRatingStyle = { color: 'red' };
        }

        return <Icon style={healthRatingStyle} name='heart' />;
      case 'OccupationalHealthcare':
        return null;
      case 'Hospital':
        return null;
      default:
        return assertNever(e);
    }
  };

  return (
    <div style={style} key={entry.id}>
      {drawHeading(entry)}
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map(d => <li key={d}>{d} {state.diagnoses[d].name}</li>)}
      </ul>
      {drawHealthRating(entry)}
    </div>);
};

export default PatientEntry;