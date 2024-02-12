import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 40, b: 2, action: Action.Add, expected: 42 },
  { a: 40, b: 2, action: Action.Subtract, expected: 38 },
  { a: 40, b: 2, action: Action.Multiply, expected: 80 },
  { a: 40, b: 2, action: Action.Divide, expected: 20 },
  { a: 40, b: 2, action: Action.Exponentiate, expected: 1600 },
  { a: 40, b: 2, action: 'plus', expected: null },
  { a: '40', b: 2, action: Action.Add, expected: null },
  { a: 40, b: '2', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('testCases', ({a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });

    expect(result).toEqual(expected);
  });
});
