export interface Diagnose {
  code: string,
  name: string,
  latin?: string,
};

export enum Gender {
  Male = 'male',
  Female = 'female',
};

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: {
    date: string,
    criteria: string,
  }
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string,
  }
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[],
};

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
