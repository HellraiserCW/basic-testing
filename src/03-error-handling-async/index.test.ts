import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue('value');

    expect(result).toEqual('value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const result = () => throwError('Custom error message');

    expect(result).toThrowError('Custom error message');
  });

  test('should throw error with default message if message is not provided', () => {
    const result = () => throwError();

    expect(result).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const result = () => throwCustomError();

    expect(result).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const result = rejectCustomError();

    await expect(result).rejects.toThrowError(MyAwesomeError);
  });
});
