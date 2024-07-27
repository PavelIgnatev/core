import { Account } from "../@types/Account";
import { DB } from "./db";

const getAccountCollection = async () => {
  return (await DB()).collection("accounts");
};

export const getAccounts = async () => {
  const accountCollection = await getAccountCollection();

  const accounts = await accountCollection.distinct("accountId", {
    banned: { $ne: true },
    stopped: { $ne: true },
    setuped: { $ne: true },
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
  accountData: Object
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
