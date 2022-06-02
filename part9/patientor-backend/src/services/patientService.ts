import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { Patient, NewPatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getUnsensitivePatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  })); 
};

const addPatient = (newPatient: NewPatient): Patient => {
  const id: string = uuid();
  return {
    id: id,
    ...newPatient,
  };
};

export default {
  getPatients,
  getUnsensitivePatients,
  addPatient,
};