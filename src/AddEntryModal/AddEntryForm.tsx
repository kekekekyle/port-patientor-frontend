import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField } from "./FormField";
import { EntryWithoutId, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientModal/FormField";

export type EntryFormValues = EntryWithoutId;

interface HealthCheckProps {
  onSubmit: (values: Omit<HealthCheckEntry, 'id'>) => void;
  onCancel: () => void;
}

interface HospitalEntryProps {
  onSubmit: (values: Omit<HospitalEntry, 'id'>) => void;
  onCancel: () => void;
}

interface OccupationalHealthcareEntryProps {
  onSubmit: (values: Omit<OccupationalHealthcareEntry, 'id'>) => void;
  onCancel: () => void;
}

export const AddHealthCheckEntryForm = ({ onSubmit, onCancel }: HealthCheckProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const formatError = "Field is malformed";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!Date.parse(values.date)) {
          errors.date = formatError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
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
            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
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

export const AddHospitalEntryForm = ({ onSubmit, onCancel }: HospitalEntryProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const formatError = "Field is malformed";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: { [field: string]: any } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!Date.parse(values.date)) {
          errors.date = formatError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.discharge && !values.discharge.date) {
          errors.discharge = {
            date: requiredError
          };
        }
        if (values.discharge && !Date.parse(values.discharge.date)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errors.discharge = {
            ...errors.discharge,
            date: formatError
          };
        }
        if (values.discharge && !values.discharge.criteria) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errors.discharge = {
            ...errors.discharge,
            criteria: requiredError
          };
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
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
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Discharge Criteria"
              name="discharge.criteria"
              component={TextField}
            />
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

export const AddOccupationalHealthcareForm = ({ onSubmit, onCancel }: OccupationalHealthcareEntryProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const formatError = "Field is malformed";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: { [field: string]: any } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave && !Date.parse(values.sickLeave.startDate)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errors.sickLeave = {
            ...errors.sickLeave,
            startDate: formatError
          };
        }
        if (values.sickLeave && !Date.parse(values.sickLeave.endDate)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errors.sickLeave = {
            ...errors.sickLeave,
            endDate: formatError
          };
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
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
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
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
