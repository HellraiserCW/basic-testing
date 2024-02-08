import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3, 4, 5];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: null,
            },
          },
        },
      },
    };

    const generatedLinkedList = generateLinkedList(elements);
    expect(generatedLinkedList).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const elements = [5, 4, 3, 2, 1];
    const generatedLinkedList = generateLinkedList(elements);

    expect(generatedLinkedList).toMatchSnapshot();
  });
});
