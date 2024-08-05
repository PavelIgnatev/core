import { DB } from './db';
import { Account } from '../@types/Account';

const getInvitesCollection = async () => {
  return (await DB()).collection('invites');
};

export const getInviteById = async (
  accountId: string,
  inviteBotName: string
) => {
  const invitesCollection = await getInvitesCollection();

  const account = await invitesCollection.findOne<Account>({
    accountId,
    inviteBotName,
  });

  return account;
};

export const updateInviteByAccountId = async (
  accountId: string,
  inviteBotName: string,
  accountData: object
) => {
  const invitesCollection = await getInvitesCollection();

  await invitesCollection.findOneAndUpdate(
    { accountId, inviteBotName },
    { $set: { ...accountData, dateUpdated: new Date() } },
    { upsert: true }
  );
};
