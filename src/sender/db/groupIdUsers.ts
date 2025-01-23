import { DB } from './db';

const getGroupIdUsersCollection = async () => {
  return (await DB()).collection('groupIdUsers');
};

export const updateFailedMessage = async (
  accountId: string,
  username: string,
  groupId: string,
  reason: string
) => {
  const messagesCollection = await getGroupIdUsersCollection();

  await messagesCollection.updateOne(
    { g: groupId, u: username.toLowerCase() },
    { $set: { f: true, p: new Date(), r: reason, a: accountId } },
    { upsert: true }
  );
};

export const updateSendMessage = async (
  username: string,
  groupId: string,
  data: Record<string, unknown>
) => {
  const messagesCollection = await getGroupIdUsersCollection();

  await messagesCollection.updateOne(
    { g: groupId, u: username.toLowerCase() },
    { $set: data },
    { upsert: true }
  );
};
