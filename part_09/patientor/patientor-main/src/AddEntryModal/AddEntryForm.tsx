import React, { useEffect, useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { EntryTypes, NewEntry } from "../types";
import { DiagnosisSelection, TextField } from "./FormField";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const [entryType, setEntryType] = useState<EntryTypes>(EntryTypes.Hospital);
  const [initialFormValues, setInitialFormValues] = useState<NewEntry>({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: undefined,
    type: 'Hospital',
    discharge: {
      date: "",
      criteria: "",
    },
  });

  useEffect(() => {
    const baseEntryDefaults = {
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: undefined,
    };

    switch (entryType) {
      case EntryTypes.Hospital:
        setInitialFormValues({
          ...baseEntryDefaults,
          type: 'Hospital',
          discharge: {
            date: "",
            criteria: "",
          },
        });
        break;
      case EntryTypes.OccupationalHealthcare:
        setInitialFormValues({
          ...baseEntryDefaults,
          type: 'OccupationalHealthcare',
          employerName: '',
          sickLeave: {
            startDate: '',
            endDate: '',
          },
        });
        break;
      case EntryTypes.HealthCheck:
        setInitialFormValues({
          ...baseEntryDefaults,
          type: 'HealthCheck',
          healthCheckRating: 0,
        });
        break;
      default:
        return assertNever(entryType);
    }
  }, [entryType]);

  const changeEntryType = ({ target }: { target: any }) => {
    switch (target.value) {
      case EntryTypes.Hospital: setEntryType(EntryTypes.Hospital); break;
      case EntryTypes.OccupationalHealthcare: setEntryType(EntryTypes.OccupationalHealthcare); break;
      case EntryTypes.HealthCheck: setEntryType(EntryTypes.HealthCheck); break;
    }
  };

  const entrySpecificFormValidator = (
    values: NewEntry,
    errors: { [field: string]: string },
    requiredError: string,
  ) => {
    switch (entryType) {
      case EntryTypes.Hospital:
        if (values.type === 'Hospital') {
          if (!Date.parse(values.discharge.date)) {
            errors.discharge = requiredError;
          }

          if (!values.discharge.criteria) {
            errors.discharge = requiredError;
          }
        }
        return errors;
      case EntryTypes.OccupationalHealthcare:
        if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (values.sickLeave) {
            if (!Date.parse(values.sickLeave.startDate)) {
              errors.startDate = requiredError;
            }
            if (!Date.parse(values.sickLeave.endDate)) {
              errors.endDate = requiredError;
            }
          }
        }
        return errors;
      case EntryTypes.HealthCheck:
        if (values.type === 'HealthCheck') {
          //
        }
        return errors;
    }
  };

  const drawEntrySpecificFormFields = () => {
    switch (entryType) {
      case EntryTypes.Hospital:
        return (
          <div>
            <Field
              label="Discharge criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
          </div>
        );
      case EntryTypes.OccupationalHealthcare:
        return (
          <div>
            <Field
              label="Employer Name"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />
            <p>Sick leave</p>
            <Field
              label="Start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="End date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
          </div>
        );
      case EntryTypes.HealthCheck:
        return (
          <Field
            label="Health Check Rating"
            placeholder="Health Check Rating (0-3)"
            name="healthCheckRating"
            component={TextField}
          />
        );
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is missing or not in correct format.";
        const errors: { [field: string]: string } = {};

        if (!values.description) {
          errors.name = requiredError;
        }
        if (!values.date || !Date.parse(values.date)) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return entrySpecificFormValidator(values, errors, requiredError);
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              as="select"
              label="Type"
              name="type"
              value={entryType}
              onChange={changeEntryType}
            >
              <option value={EntryTypes.Hospital}>Hospital</option>
              <option value={EntryTypes.OccupationalHealthcare}>Occupational Healthcare</option>
              <option value={EntryTypes.HealthCheck}>Health Check</option>
            </Field>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            {drawEntrySpecificFormFields()}

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
