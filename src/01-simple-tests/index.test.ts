import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 40, b: 2, action: Action.Add });

    expect(result).toBe(42);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 40, b: 2, action: Action.Subtract });

    expect(result).toBe(38);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 40, b: 2, action: Action.Multiply });

    expect(result).toBe(80);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 40, b: 2, action: Action.Divide });

    expect(result).toBe(20);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a: 40, b: 2, action: Action.Exponentiate });

    expect(result).toBe(1600);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 40, b: 2, action: 'plus' });

    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result1 = simpleCalculator({ a: '40', b: 2, action: Action.Add });
    const result2 = simpleCalculator({ a: 40, b: '2', action: Action.Add });

    expect(result1).toBe(null);
    expect(result2).toBe(null);
  });
});
