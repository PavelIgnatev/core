import { DB } from './db';
import { Account } from '../@types/Account';

const getAccountCollection = async () => {
  return (await DB()).collection('accounts');
};

export const getAccounts = async (start: number, end: number) => {
  if (
    typeof start !== 'number' ||
    typeof end !== 'number' ||
    Number.isNaN(start) ||
    Number.isNaN(end)
  ) {
    throw new Error('Start or end parameter incorrect');
  }

  const accountCollection = await getAccountCollection();

  const accounts = await accountCollection
    .find({}, { projection: { _id: 0, accountId: 1, banned: 1, stopped: 1 } })
    .skip(start)
    .limit(end - start)
    .toArray();

  const ids = accounts
    .filter((e) => !e.banned && !e.stopped)
    .map(({ accountId }) => accountId);

  return ids;
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
