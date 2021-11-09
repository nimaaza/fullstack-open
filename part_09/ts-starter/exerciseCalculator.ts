interface TrainingEvaluation {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
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
  };

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
