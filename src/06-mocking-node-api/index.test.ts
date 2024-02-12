import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from './index';

jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 2000;

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 2000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 2000;

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenLastCalledWith(callback, interval);
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
  const fileName = 'test.txt';
  const fileContent = 'file content';

  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');

    await readFileAsynchronously(fileName);

    expect(spy).toHaveBeenCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(fileName);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(fileContent);

    const result = await readFileAsynchronously(fileName);

    expect(result).toBe(fileContent);
  });
});
