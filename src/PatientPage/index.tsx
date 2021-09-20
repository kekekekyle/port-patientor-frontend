import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Header, Icon, Segment, Button } from "semantic-ui-react";

import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
import { useStateValue, setPatient, addEntry } from "../state";

import EntryDetails from './EntryDetails';
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  React.useEffect(() => {
    const fetchPatient = async () => {
      if (!patient || patient.id !== id) {
        try {
          const { data: patientFromApi } = await axios.get<Patient[]>(
            `${apiBaseUrl}/patients/${id}`
          );
          if (patientFromApi.length === 1) {
            dispatch(setPatient(patientFromApi[0]));
          }
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchPatient();
  }, []);

  const genderIcon = {
    'male': 'mars',
    'female': 'venus',
    'other': 'other gender'
  };

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<string>("");
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (modalType: string): void => {
    setModalType(modalType);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  if (!patient || !diagnoses) {
    return null;
  }

  return (
    <div>
      <Header as='h3'>{patient.name} <Icon className={genderIcon[patient.gender]} /></Header>
      <p>DOB: {patient.dateOfBirth}</p>
      <p>occupation: {patient.occupation}</p>
      <p>ssn: {patient.ssn}</p>
      <Header as='h3'>entries</Header>
      <AddEntryModal
        modalType={modalType}
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal('HealthCheck')}>Add New Health Check Entry</Button>
      <Button onClick={() => openModal('Hospital')}>Add New Hospital Entry</Button>
      <Button onClick={() => openModal('OccupationalHealthcare')}>Add New Occupational Healthcare Entry</Button>
      {Object.values(patient.entries).map((entry: Entry) => (
        <Segment key={entry.id}>
          <EntryDetails entry={entry} />
        </Segment>
      ))}
    </div>
  );
};

export default PatientPage;
