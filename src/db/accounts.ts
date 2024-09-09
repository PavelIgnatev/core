import { DB } from './db';
import { Account } from '../@types/Account';

const getAccountCollection = async () => {
  return (await DB()).collection('accounts');
};

export const getAccounts = async () => {
  const accountCollection = await getAccountCollection();

  const accounts = await accountCollection.distinct('accountId', {
    banned: { $ne: true },
    stopped: { $ne: true },
  });

  return accounts
};

export const getAccountById = async (accountId: string) => {
  const accountCollection = await getAccountCollection();

  const account = await accountCollection.findOne<Account>({ accountId });

  return account;
};

export const updateAccountById = async (
  accountId: string,
  accountData: object
) => {
  const accountCollection = await getAccountCollection();

  await accountCollection.findOneAndUpdate(
    { accountId },
    { $set: { ...accountData, dateUpdated: new Date() } }
  );
};

export const incrementMessageCount = async (accountId: string) => {
  const accountCollection = await getAccountCollection();

  await accountCollection.updateOne(
    { accountId },
    {
      $inc: { messageCount: 1 },
    }
  );
};

export const getTotalAccounts = async () => {
  const accountCollection = await getAccountCollection();

  const totalAccounts = await accountCollection.countDocuments();

  return totalAccounts;
};
