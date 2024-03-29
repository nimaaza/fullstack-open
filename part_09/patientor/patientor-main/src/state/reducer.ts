import { State } from "./state";
import { Diagnose, Entry, Patient } from "../types";

export type Action =
  | {
    type: 'SET_DIAGNOSIS_LIST';
    payload: Diagnose[];
  }
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: 'ADD_ENTRY',
    payload: {
      id: string,
      entry: Entry,
    }
  };

export const setDiagnosisList = (diagnosisList: Diagnose[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnosisList,
  };
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  };
};

export const addEntrytoPatient = (id: string, entry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: {
      id: id,
      entry: entry,
    }
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => {
              return {
                ...memo,
                [diagnose.code]: { name: diagnose.name, code: diagnose.code }
              };
            }
            , {}),
        }
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'ADD_ENTRY':
      const updatedPatient = state.patients[action.payload.id];
      updatedPatient.entries.push(action.payload.entry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: updatedPatient,
        }
      };
    default:
      return state;
  }
};
