import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

jest.mock('lodash', () => ({
  throttle: jest.fn((fn: Function) => fn),
}));

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/posts';
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts';
    await throttledGetDataFromApi(relativePath);

    expect(axios.create().get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const responseData = [{ id: 1, title: 'Test Post' }];
    (axios.create().get as jest.Mock).mockResolvedValueOnce({ data: responseData });

    const result = await throttledGetDataFromApi('/posts');

    expect(result).toEqual(responseData);
  });
});
