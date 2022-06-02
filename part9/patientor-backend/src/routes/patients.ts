import express from 'express';

import patientService from '../services/patientService'; 
import parsePatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getUnsensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = parsePatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = 'An error occured.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;