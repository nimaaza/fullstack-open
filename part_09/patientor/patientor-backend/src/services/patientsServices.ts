import { v1 as uuid } from 'uuid';

import { NewPatient, Patient } from "../types";

import { patientsData } from '../../data/patients';

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addNewPatient = (newPatient: NewPatient): Patient => {
  const addedPatient = { id: uuid(), ...newPatient };
  patientsData.push(addedPatient);
  return addedPatient;
};

export default {
  getPatients,
  addNewPatient,
};
