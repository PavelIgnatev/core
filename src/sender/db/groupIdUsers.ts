import { coreDB } from './db';

const getGroupIdUsersCollection = async () => {
  return (await coreDB()).collection('groupIdUsers');
};

export const resetAllPFields = async () => {
  const messagesCollection = await getGroupIdUsersCollection();

  await messagesCollection.updateMany(
    { p: { $ne: null }, s: { $ne: true } },
    { $set: { p: null } }
  );
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
