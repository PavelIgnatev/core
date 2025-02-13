import { Account } from '../@types/Account';
import { coreDB } from './db';

const getAccountCollection = async () => {
  return (await coreDB()).collection('accounts');
};

export const getAccountsReLogin = async () => {
  const accountCollection = await getAccountCollection();

  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

  const accounts = await accountCollection.distinct('accountId', {
    banned: { $ne: true },
    parentAccountId: null,
    workedOut: { $ne: true },
    $or: [
      { reloginAttemptDate: { $lt: thirtyMinutesAgo } },
      { reloginAttemptDate: { $exists: false } },
      { reloginAttemptDate: null },
    ],
  });

  return accounts;
};

export const getAccountsReCheck = async () => {
  const accountCollection = await getAccountCollection();

  const accounts = await accountCollection.distinct('accountId', {
    stable: { $ne: true },
    banned: { $ne: true },
    stopped: { $ne: true },
    parentAccountId: { $ne: null },
  });

  return accounts;
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
    { $set: { ...accountData, dateUpdated: new Date() } },
    { upsert: true }
  );
};
