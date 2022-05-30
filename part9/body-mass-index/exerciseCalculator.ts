interface exerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface exerciseTrack {
  target: number
  hours: number[]
}

export const calculateExercises = (target: number, hours: number[]): exerciseResult => {
  const average: number = hours.reduce((a: number, b: number, i: number) => {
    if (i === hours.length - 1) {
      return (a + b) / hours.length;
    } else {
      return a + b;
    }
  });
  const rating: number = average > target * 1.5 ? 3 : (average / target) + 1;

  const ratingDescription = (r: number): string => {
    if (r < 1.5) {
      return 'you definitely should work harder';
    } else if (r < 2) {
      return 'not too bad but could be better';
    } else if (r === 2) {
      return 'your target is achieved';
    } else if (r < 2.5) {
      return 'keep going, you\'re doing great !';
    } else {
      return 'you\'ll get there, I promise';
    }
  };
  
  return {
    periodLength: hours.length,
    trainingDays: hours.filter(h => h !== 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription(rating),
    target: target,
    average: average
  };
};

const argumentParser = (args: string[]): exerciseTrack => {
  if (args.length < 4) throw new Error('Not enough arguments');
  let argumentsAreValid = true;
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      argumentsAreValid = false;
      break;
    }
  }
  if (argumentsAreValid) {
    const hours = args.slice(3, args.length).map(a => Number(a));
    return {
      target: Number(args[2]),
      hours: hours
    };
  } else {
    throw new Error('The arguments are not numbers');
  }
};

try {
  const { target, hours } = argumentParser(process.argv);
  const result = calculateExercises(target, hours);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'An error occured.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

