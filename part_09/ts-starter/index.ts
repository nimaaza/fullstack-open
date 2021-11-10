/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(500).json({
      error: 'malformed parameters'
    });
  } else {
    res.json({
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight),
    });
  }
});

app.post('/exercises', (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    res.status(400).json({ error: 'missing parameters' }).end();
  }

  const dailyHours: Array<number> = req.body.daily_exercises.map(Number);
  const target = Number(req.body.target);

  if (isNaN(target) || dailyHours.some(isNaN)) {
    res.status(400).json({ error: 'malformed parameters' }).end();
  }

  res.json(calculateExercises(dailyHours, target)).end();
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
