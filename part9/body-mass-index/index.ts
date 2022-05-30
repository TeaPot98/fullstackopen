/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.get('/bmi', (req, res) => {
  console.log(req.query);
  if (req.query.height && req.query.weight && !isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    const bmi = calculateBmi(height, weight);
    res.send({
      weight: weight,
      height: height,
      bmi: bmi
    });
  } else {
    res.status(400).send({
      error: 'malformatted parameters'
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;
  try {
    const hours = body.daily_exercises;
    const target = body.target;
    const result = calculateExercises(target, hours);
    res.send(result);
  } catch (error: unknown) {
    let errorMessage = 'An error occured';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
});

// let value: any = 1

const PORT = 3003;

app.listen(PORT, () => {
  
  console.log(`Server running on port ${PORT}`);
});