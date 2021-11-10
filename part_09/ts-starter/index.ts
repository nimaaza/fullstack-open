import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
