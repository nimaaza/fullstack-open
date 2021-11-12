import { Patient } from "../types";

import patientsData from '../../data/patients.json';

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

export default {
  getPatients,
};
