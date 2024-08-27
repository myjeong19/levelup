type Operator = '+' | '-' | '*' | '/';

type Operations = { [key in Operator]: (number1: number, number2: number) => number };

const operations: Operations = {
  '+': (number1, number2) => number1 + number2,
  '-': (number1, number2) => number1 - number2,
  '*': (number1, number2) => number1 * number2,
  '/': (number1, number2) => number1 / number2,
};

type PreviousOperation = {
  equation: string;
  result: number;
};

export type Result = {
  state: '새로운 값' | '캐싱된 값';
  value: number;
};

export function sum(num1: number, num2: number, operator: Operator): () => Result {
  const previousOperations: PreviousOperation[] = [];

  return () => {
    const equation = `${num1}${operator}${num2}`;
    const previousResult = previousOperations.find(operation => operation.equation === equation);

    if (previousResult) {
      return {
        state: '캐싱된 값',
        value: previousResult.result,
      };
    }

    const result = operations[operator](num1, num2);
    previousOperations.push({ equation, result });

    return {
      state: '새로운 값',
      value: result,
    };
  };
}
