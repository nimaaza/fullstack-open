type Operation = 'multiply' | 'add' | 'divide';

// const calculator = (a: number, b: number, op: Operation): number | string => {
// // const calculator = (a: number, b: number, op: Operation): number => {
//   if (op === 'multiply') {
//     return a * b;
//   } else if (op === 'add') {
//     return a + b;
//   } else if (op === 'divide') {
//     if (b === 0) return 'can\'t divide by zero';
//     return a / b;
//   }
// };

// calculator(1, 4, 'yolo');

type Result = number;

const calculator = (a: number, b: number, op: Operation) : Result => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error('can\'t divide by zero');
      return a / b;
    default:
      throw new Error('operation not multiply, add, or divide');
  }
};

try {
  console.log(calculator(1, 5, 'divide'));
} catch (e: any) {
  console.log('Something went wrong: ', e.message);
}

export { calculator };
