import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const expectedLinkedList = {
      value: '1',
      next: {
        value: null,
        next: {
          value: null,
          next: null
        },
      },
    };

    const linkedList = generateLinkedList(['1', null]);

    expect(linkedList).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const elements = [2, 3, 4, 5];

    const linkedList = generateLinkedList(elements);

    expect(linkedList).toMatchSnapshot();
  });
});
