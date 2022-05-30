/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import bodyParser from 'body-parser';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());

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
  const body = req.body;
  console.log(body);
  if (body.daily_exercises && body.target) {
    const hours = body.daily_exercises;
    const target = body.target;
    console.log(Array.isArray(hours));
    console.log(typeof(target));
    if (Array.isArray(hours) && hours.length > 0 && hours.every(value =>  typeof(value) === 'number') && !isNaN(target)) {
      const response = calculateExercises(target, hours);
      res.send(response);
    } else {
      res.status(400).send({
        error: 'malformatted parameters'
      });
    }
  } else {
    res.status(400).send({
      error: 'parameters missing'
    });
  }
});

// let value: any = 1

const PORT = 3003;

app.listen(PORT, () => {
  
  console.log(`Server running on port ${PORT}`);
});