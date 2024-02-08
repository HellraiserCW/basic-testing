import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from './index';
import { existsSync, readFile } from 'fs';
import path from 'path';

jest.mock('fs', () => ({
  existsSync: jest.fn((_) => false),
  readFile: jest.fn((_, __, callback) => callback(null, '')),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 2000;
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 2000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 2000;

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 2000;
    const numIntervals = 4;

    doStuffByInterval(callback, interval);

    for (let i = 0; i < numIntervals; i++) {
      jest.advanceTimersByTime(interval);

      expect(callback).toHaveBeenCalledTimes(i + 1);
    }
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'test.txt';

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });
// TODO
  test('should return file content if file exists', async () => {
    const pathToFile = 'test.txt';
    const fileContent = 'file content';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as unknown as jest.Mock).mockImplementation((_, __, callback) => callback(null, fileContent));

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);
  });
});
