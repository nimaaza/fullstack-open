import React from "react";
import axios from "axios";
import { useParams } from "react-router";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { addPatient, useStateValue } from "../state";
import PatientEntry from "./Entry";

const DisplayPatient = () => {
  const [state, dispatch] = useStateValue();

  const getPatient = async (id: string) => {
    const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    return patient;
  };

  const { id } = useParams<{ id: string }>();

  if (!state.patients[id] || !state.patients[id].ssn) {
    void getPatient(id).then(patient => {
      dispatch(addPatient(patient));
    });
  }

  return (
    <div>
      <h1>{state.patients[id].name}</h1>
      <p>gender: {state.patients[id].gender}</p>
      <p>ssn: {state.patients[id].ssn}</p>
      <p>occuption: {state.patients[id].occupation}</p>
      <h2>Entries</h2>
      {state.patients[id].entries.map(e => {
        return <PatientEntry key={e.id} entry={e} />;
      })}
    </div>
  );
};

export default DisplayPatient;
