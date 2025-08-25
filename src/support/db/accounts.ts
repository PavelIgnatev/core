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

  const accounts = await accountCollection
    .find({
      stable: true,
      banned: { $ne: true },
      stopped: { $ne: true },
      parentAccountId: { $ne: null },
      forceStop: { $ne: true },
    },
    { projection: { accountId: 1 } }
  )
    .sort({ checkDate: 1 })
    .limit(1000)
    .toArray();

  return accounts.map(account => account.accountId);

  return accounts;
};

export const getPhones = async () => {
  const accountCollection = await getAccountCollection();

  const phones = await accountCollection.distinct('phone', {
    stable: true,
    banned: { $ne: true },
    stopped: { $ne: true },
    parentAccountId: { $ne: null },
  });

  return phones;
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

export const unsetAccountById = async (
  accountId: string,
  accountData: object
) => {
  const accountCollection = await getAccountCollection();

  await accountCollection.findOneAndUpdate(
    { accountId },
    { $unset: { ...accountData } }
  );
};
