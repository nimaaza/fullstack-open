import React from "react";
import axios from "axios";
import { useParams } from "react-router";

import { Entry, NewEntry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { addEntrytoPatient, addPatient, useStateValue } from "../state";
import PatientEntry from "./Entry";
import { Button } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";

const DisplayPatient = () => {
  const [state, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<{ id: string }>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (newEntry: NewEntry) => {
    try {
      const { data: addedEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newEntry
      );
      console.log('from front-end');
      console.log(newEntry);
      dispatch(addEntrytoPatient(id, addedEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  const getPatient = async (id: string) => {
    const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    return patient;
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default DisplayPatient;
