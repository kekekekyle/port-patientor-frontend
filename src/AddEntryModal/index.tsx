import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { AddHealthCheckEntryForm, AddHospitalEntryForm, AddOccupationalHealthcareForm, EntryFormValues } from './AddEntryForm';

interface Props {
  modalType: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalType, modalOpen, onClose, onSubmit, error }: Props) => {
  let modal;
  switch (modalType) {
    case 'HealthCheck':
      modal = <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />;
      break;
    case 'Hospital':
      modal = <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />;
      break;
    case 'OccupationalHealthcare':
      modal = <AddOccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />;
      break;
    default:
      modal = null;
      break;
  }

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {modal}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
