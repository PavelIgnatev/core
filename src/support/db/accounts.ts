import { Account } from '../@types/Account';
import { coreDB } from './db';

const getAccountCollection = async () => {
  return (await coreDB()).collection('accounts');
};

export const getAccounts = async () => {
  const accountCollection = await getAccountCollection();

  await accountCollection.updateMany(
    { forceStop: true },
    { $set: { banned: true, reason: 'manual-stopped' } }
  );

  const accounts = await accountCollection.distinct('accountId', {
    stable: true,
    banned: { $ne: true },
    stopped: { $ne: true },
    parentAccountId: { $ne: null },
    forceStop: { $ne: true },
  });

  return accounts;
};

export const getAccountById = async (accountId: string) => {
  const accountCollection = await getAccountCollection();

  const account = await accountCollection.findOne<Account>({ accountId });

  if (!account) {
    throw new Error('ACCOUNT_NOT_DEFINED');
  }

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
