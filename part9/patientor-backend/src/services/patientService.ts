import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { Patient, NewPatient, PublicPatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getUnsensitivePatients = (): PublicPatient[] => {
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

const getById = (patientId: string): Patient | undefined => {
  const patient = patients.find(p => p.id === patientId);
  return patient;
};

export default {
  getPatients,
  getUnsensitivePatients,
  addPatient,
  getById,
};