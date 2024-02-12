import lodash from 'lodash';

import {
  BankAccount, getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';

describe('BankAccount', () => {
  let account1: BankAccount;
  let account2: BankAccount;
  const initialBalance = 1000;

  beforeEach(() => {
    account1 = getBankAccount(initialBalance);
    account2 = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    const result = account1.getBalance();

    expect(result).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const result = () => account1.withdraw(initialBalance + 1);

    expect(result).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const result = () => account1.transfer(account1.getBalance() + 1, account2);

    expect(result).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const result = () => account1.transfer(account1.getBalance(), account1);

    expect(result).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const balanceBeforeDeposit: number = account1.getBalance();
    const depositAmount = 500;

    account1.deposit(depositAmount);
    const result = account1.getBalance();

    expect(result).toBe(balanceBeforeDeposit + depositAmount);
  });

  test('should withdraw money', () => {
    const balanceBeforeWithdrawal: number = account1.getBalance();
    const withdrawAmount = 500;

    account1.withdraw(500);
    const result = account1.getBalance();

    expect(result).toBe(balanceBeforeWithdrawal - withdrawAmount);
  });

  test('should transfer money', () => {
    const account1InitialBalance = account1.getBalance();
    const account2InitialBalance = account2.getBalance();
    const transferAmount = 500;

    account1.transfer(transferAmount, account2);

    const result1 = account1.getBalance();
    const result2 = account2.getBalance();

    expect(result1).toBe(account1InitialBalance - transferAmount);
    expect(result2).toBe(account2InitialBalance + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchedBalance = 500;
    jest.spyOn(lodash, 'random').mockReturnValueOnce(fetchedBalance).mockReturnValueOnce(1);

    const result = await account1.fetchBalance();

    expect(result).toBe(fetchedBalance)
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchedBalance = 500;
    jest.spyOn(account1, 'fetchBalance').mockResolvedValueOnce(fetchedBalance);

    await account1.synchronizeBalance();
    const result = account1.getBalance();

    expect(result).toBe(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account1, 'fetchBalance').mockResolvedValueOnce(null);

    const result = account1.synchronizeBalance();

    await expect(result).rejects.toThrowError(SynchronizationFailedError);
  });
});
