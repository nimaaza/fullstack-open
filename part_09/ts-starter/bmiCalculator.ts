interface HealthMetrics {
  height: number,
  weight: number,
};

const parseBmiArguments = (args: Array<string>): HealthMetrics => {
  if (args.length < 4 || args.length > 4) throw new Error('Wrong number of arguments.');

  const height: number = Number(args[2]);
  const weight: number = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height: height,
      weight: weight,
    }
  } else {
    throw new Error('Wrong type of arguments.')
  }
};

const calculateBmi = (height: number, weight:number): string => {
  const bmi: number = weight / (height * height) * 10000;

  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 24.9) {
    return "Normal range";
  } else if (bmi < 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 34.9) {
    return "Obese (Class I)";
  } else if (bmi < 39.9) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch(error) {
  console.error(error.message);
}

export { calculateBmi };
