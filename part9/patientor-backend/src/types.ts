export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;  
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRish" = 2,
  "CriticalRisk" = 3
}

interface Discharge {
  date: string,
  criteria: string,
}

interface SickLeave {
  startDate: string,
  endDate: string,
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: Discharge,
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry = 
  | HospitalEntry 
  | OccupationalHealthcareEntry
  | HealthCheckEntry;