import { Patient } from '../src/types';
import { toNewPatient } from '../src/utils';

import rawPatientData from './patientsData.json';

export const patientsData: Patient[] = rawPatientData.map(p => {
  const patient = toNewPatient(p) as Patient;
  patient.id = p.id;
  return patient;
});
