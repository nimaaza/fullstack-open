import { Gender, NewEntry, NewPatient } from "./types";

const isString = (s: unknown): s is string => {
  return typeof (s) === 'string' || s instanceof String;
}

const isGender = (object: any): object is Gender => {
  return Object.values(Gender).includes(object);
};

const parseName = (object: any): string => {
  if (!object.name || !isString(object.name)) {
    throw new Error('Patient has no valid name.');
  }

  return object.name;
};

const parseDateOfBirth = (object: any): string => {
  if (!object.dateOfBirth || !isString(object.name) || !Date.parse(object.dateOfBirth)) {
    throw new Error('Patient has no valid date of birth.');
  }

  return object.dateOfBirth;
};

const parseSsn = (object: any): string => {
  if (!object.ssn || !isString(object.ssn)) {
    throw new Error('Patient has no valid ssn.');
  }

  return object.ssn;
};

const parseGender = (object: any): Gender => {
  if (!object.gender || !isGender(object.gender)) {
    throw new Error('Patient has no valid gender.');
  }

  return object.gender;
};

const parseOccupation = (object: any): string => {
  if (!object.occupation || !isString(object.occupation)) {
    throw new Error('Patient has no valid occupation.');
  }

  return object.occupation;
};

// const parseEntries = (object: any): Entry[] => {
//   return [];
// };

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object),
    dateOfBirth: parseDateOfBirth(object),
    ssn: parseSsn(object),
    gender: parseGender(object),
    occupation: parseOccupation(object),
    entries: [],
  }
};

const toNewEntry = (entry: NewEntry): NewEntry => {
  const newEntry = {
    description: entry.description,
    date: entry.date,
    specialist: entry.specialist,
    diagnosisCode: entry.diagnosisCodes,
    type: '',
  };

  switch (entry.type) {
    case 'HealthCheck':
      return {
        ...newEntry,
        type: 'HealthCheck',
        healthCheckRating: entry.healthCheckRating,
      };
    case 'Hospital':
      return {
        ...newEntry,
        type: 'Hospital',
        discharge: {
          date: entry.discharge.date,
          criteria: entry.discharge.criteria,
        }
      };
    case 'OccupationalHealthcare':
      return {
        ...newEntry,
        type: 'OccupationalHealthcare',
        employerName: entry.employerName,
        sickLeave: entry.sickLeave
          ? { startDate: entry.sickLeave.startDate, endDate: entry.sickLeave.endDate }
          : undefined,
      };
    default:
      throw new Error('Malformed entry for patient.');
  }
};

export {
  toNewPatient,
  toNewEntry,
};
