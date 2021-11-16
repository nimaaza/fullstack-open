import { v1 as uuid } from 'uuid';

import { NewPatient, Patient } from "../types";

import patientsData from '../../data/patients';

const getPatient = (id: string): Patient | undefined => {
  return patientsData.find(p => p.id === id);
  // return {
  //   id: patient.id,
  //   ssn: patient.ssn,
  //   name: patient.name,
  //   dateOfBirth: patient.dateOfBirth,
  //   gender: patient.gender,
  //   occupation: patient.occupation,
  //   entries: patient.entries,
  // };
};

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
    return { id, name, dateOfBirth, gender, occupation, entries };
  });
};

const addNewPatient = (newPatient: NewPatient): Patient => {
  const addedPatient = { id: uuid(), ...newPatient };
  patientsData.push(addedPatient);
  return addedPatient;
};

export default {
  getPatient,
  getPatients,
  addNewPatient,
};
