import React from 'react';
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';
import { Header, Icon, Label } from "semantic-ui-react";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }): JSX.Element => {
  return (
    <div>
      <Header as='h4'>{entry.date} <Icon name='hospital symbol' /></Header>
      <Label>{entry.description}</Label>
    </div>
  );
};

const OccupationalHealthcareDetails = ({ entry }: { entry: OccupationalHealthcareEntry }): JSX.Element => {
  return (
    <div>
      <Header as='h4'>{entry.date} <Icon name='doctor' /></Header>
      <Label>{entry.description}</Label>
    </div>
  );
};

const healthRatingIcon = {
  0: "green",
  1: "yellow",
  2: "orange",
  3: "red"
};

const HealthCheckDetails = ({ entry }: { entry: HealthCheckEntry }): JSX.Element => {
  return (
    <div>
      <Header as='h4'>{entry.date} <Icon name='medkit' /></Header>
      <Label>{entry.description}</Label>
      <div>
        <Icon name='heart' className={healthRatingIcon[entry.healthCheckRating]} />
      </div>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
