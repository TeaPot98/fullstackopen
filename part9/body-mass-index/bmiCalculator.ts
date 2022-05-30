interface antropometricValues {
  height: number
  weight: number
}

export const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) {
    return 'Please insert a valid height value';
  }
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinnes)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal body mass';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

const parseArguments = (args: string[]) : antropometricValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided arguments are not numbers!');
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  const bmiResult = calculateBmi(height, weight);
  console.log(bmiResult);
} catch (error: unknown) {
  let errorMessage = 'An error occured.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}