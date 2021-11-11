/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import diaryService from '../services/diaryServices';

const router = express.Router();

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const { date, weather, visibility, comment } = req.body;
  const newDiaryEntry = diaryService.addEntry({
    date,
    weather,
    visibility,
    comment,
  });

  res.json(newDiaryEntry);
});

export default router;
