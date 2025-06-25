import { Account } from '../@types/Account';
import { coreDB } from './db';

const getAccountCollection = async () => {
  return (await coreDB()).collection('accounts');
};

export const getAccounts = async () => {
  const accountCollection = await getAccountCollection();

  const accounts = await accountCollection.distinct('accountId', {
    banned: { $ne: true },
    stopped: { $ne: true },
  });

  return accounts;
};

export const getAccountCreationDate = async () => {
  const accountCollection = await getAccountCollection();

  const accounts = await accountCollection
    .find<Account>(
      {
        reason: 'ACCOUNT_FROZEN_TEST',
        // banned: { $ne: true },
        // stopped: { $ne: true },
      },
      { projection: { accountId: 1 } }
    )
    .toArray();

  const accountsWithTimestamp = accounts.map((account) => ({
    _id: account._id,
    accountId: account.accountId,
    timestamp: account._id.getTimestamp(),
  }));

  const sortedAccounts = accountsWithTimestamp.sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  const CHUNK_SIZE = 100;
  const chunks = [];

  for (let i = 0; i < sortedAccounts.length; i += CHUNK_SIZE) {
    const chunk = sortedAccounts
      .slice(i, i + CHUNK_SIZE)
      .map((acc) => acc.accountId);
    chunks.push(chunk);
  }

  return chunks;
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
    { $set: { ...accountData, dateUpdated: new Date() } }
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

export const incrementMessageCount = async (accountId: string) => {
  const accountCollection = await getAccountCollection();

  await accountCollection.updateOne(
    { accountId },
    {
      $inc: { messageCount: 1 },
    }
  );
};

// export const updateAccountsWithPrefixBls = async () => {
//   const accountCollection = await getAccountCollection();

//   const result = await accountCollection.updateMany(
//     // { accountId: { $regex: 'prefix-bls$' }, banned: { $ne: true } },
//     [
//       {
//         $set: {
//           accountId: {
//             $replaceOne: {
//               input: '$accountId',
//               find: 'prefix-bls',
//               replacement: 'prefix-female-dmp1',
//             },
//           },
//           dateUpdated: new Date(),
//         },
//       },
//     ]
//   );

//   return {
//     matchedCount: result.matchedCount,
//     modifiedCount: result.modifiedCount,
//   };
// };

// updateAccountsWithPrefixBls();
