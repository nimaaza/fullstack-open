import express from 'express';
import patientsServices from '../services/patientsServices';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.post('/:id/entries', (req, res) => {
  const patient = patientsServices.getPatient(req.params.id);

  if (!patient) {
    res
      .status(404)
      .json({ error: 'Patient not found' })
      .end();
  } else {
    try {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientsServices.addNewEntry(patient, newEntry);
      res.json(addedEntry);
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = 'Could not add entry to patient due to errors: ' + error.message;
        res.status(400).json({ error: errorMessage });
      }
    }
  }
});

router.get('/:id', (req, res) => {
  const patient = patientsServices.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', (_req, res) => {
  res.json(patientsServices.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsServices.addNewPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = 'Could not add patient due to errors: ' + error.message;
      res.status(400).json({ error: errorMessage });
    }
  }
});

export default router;
