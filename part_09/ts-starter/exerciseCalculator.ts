interface Training {
  target: number,
  hours: Array<number>,
}

interface TrainingEvaluation {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const parseTrainingArguments = (args: Array<string>): Training => {
  if (args.length < 4) {
    throw new Error('Number of arguments can\'t be corrent');
  }

  const trainingArgs: Array<number> = args.slice(2).map(Number);

  if (trainingArgs.some(e => isNaN(Number(e)))) {
    throw new Error('All arguments must be numbers.');
  }

  return {
    target: trainingArgs[0],
    hours: trainingArgs.slice(1),
  };
};

const calculateExercises = (dailyHours: Array<number>, target: number): TrainingEvaluation => {
  const successes: number = dailyHours.reduce((sum, element) => element >= target ? sum + 1 : sum, 0);

  let rating: number, description: string;

  if (successes === dailyHours.length) {
    rating = 3;
  } else if (successes >= dailyHours.length / 2) {
    rating = 2;
  } else {
    rating = 1;
  }

  switch (rating) {
    case 3:
      description = 'great job';
      break;
    case 2:
      description = 'not too bad but could be better';
      break;
    case 1:
      description = 'you need to work out more';
      break;
    default:
      description = 'you have weird training habits';
  }

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(a => a != 0).length,
    success: !dailyHours.some(element => element < target),
    rating: rating,
    ratingDescription: description,
    target: target,
    average: dailyHours.reduce((sum, element) => sum + element, 0) / dailyHours.length,
  };
};

try {
  const { target, hours } = parseTrainingArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

export { calculateExercises };
