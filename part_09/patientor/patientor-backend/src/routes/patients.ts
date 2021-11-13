import express from 'express';
import patientsServices from '../services/patientsServices';
import { toNewPatient } from '../utils';

const router = express.Router();

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
