import { NewPatient, Gender, NewEntry, Diagnose, EntryType } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parsePatientEntry = (object: any): NewPatient => {
  const newPatient : NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
    // "id": "d2773336-f723-11e9-8f0b-362b9e155667",
      // "name": "John McClane",
      // "dateOfBirth": "1986-07-09",
      // "ssn": "090786-122X",
      // "gender": "male",
      // "occupation": "New york city cop"
  };
  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const parseHospitalEntry = (object: any): NewEntry => {
  const newEntry: NewEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseName(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    type: parseHospitalEntryType(object.type),
    // discharge: ,
  };
  return newEntry;
};

const parseHospitalEntryType = (type: unknown): EntryType => {
  if (!type || !isString(type) || type !== "Hospital") {
    throw new Error('Missing or incorrect type:' + type);
  }
  return type;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose['code']> => {
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
    throw new Error('Missing or incorrect diagnosisCodes: ' + diagnosisCodes);
  }
  for (let i = 0; i < diagnosisCodes.length; i++) {
    if (!isString(diagnosisCodes[i])) {
      throw new Error('Incorrect diagnosisCodes: ' + diagnosisCodes);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnosisCodes;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  // The Boolean converts to boolean an expression. For example, if Date.parse returns undefined, this functions will return 'false'
  return Boolean(Date.parse(date));
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error('Incorrect or missing SSN: ' + ssn);
  }
  return ssn;
};

const isSSN = (text: string): boolean => {
  const arr = text.split('-');
  if (arr.length !== 2 || !Number(arr[0])) {
    return false;
  }
  return true;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};
