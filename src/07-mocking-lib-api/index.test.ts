import axios from 'axios';

import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

const testURLConfig = {
  baseURL: 'https://jsonplaceholder.typicode.com'
};
const relativePath = 'users';
const mockData = {
  data: 'Some mock data'
};

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(relativePath);

    expect(spy).toHaveBeenCalledWith(testURLConfig);
  });

  test('should perform request to correct provided url', async () => {
    const testAxiosConfig = axios.create(testURLConfig);
    const spy = jest.spyOn(testAxiosConfig, 'get');
    jest.spyOn(axios, 'create').mockReturnValue(testAxiosConfig);

    await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(spy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const testAxiosConfig = axios.create(testURLConfig);
    const spy = jest.spyOn(testAxiosConfig, 'get').mockResolvedValue(mockData);
    jest.spyOn(axios, 'create').mockReturnValue(testAxiosConfig);

    const result = await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(spy).toHaveBeenCalled();
    expect(result).toBe(mockData.data);
  });
});
