import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';

describe('BankAccount', () => {
  let account1: BankAccount;
  let account2: BankAccount;

  beforeEach(() => {
    account1 = new BankAccount(1000);
    account2 = new BankAccount(20000);
  });

  test('should create account with initial balance', () => {
    const result1 = account1.getBalance();
    const result2 = account2.getBalance();

    expect(result1).toBe(1000);
    expect(result2).toBe(20000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const result = () => account1.withdraw(5000);

    expect(result).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const result = () => account1.transfer(5000, account2);

    expect(result).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const result = () => account1.transfer(500, account1);

    expect(result).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    account1.deposit(500);

    const result = account1.getBalance();

    expect(result).toBe(1500);
  });

  test('should withdraw money', () => {
    account1.withdraw(500);

    const result = account1.getBalance();

    expect(result).toBe(500);
  });

  test('should transfer money', () => {
    account1.transfer(500, account2);

    const result1 = account1.getBalance();
    const result2 = account2.getBalance();

    expect(result1).toBe(500);
    expect(result2).toBe(20500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await account1.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account1, 'fetchBalance').mockResolvedValueOnce(500);

    await account1.synchronizeBalance();
    const result = account1.getBalance();

    expect(result).toBe(500);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account1, 'fetchBalance').mockResolvedValueOnce(null);

    const result = account1.synchronizeBalance();

    await expect(result).rejects.toThrowError(SynchronizationFailedError);
  });
});
