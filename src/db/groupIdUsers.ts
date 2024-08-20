import { DB2 } from './db';

const getGroupIdUsersCollection = async () => {
  return (await DB2()).collection('groupIdUsers');
};

export const updateFailedMessage = async (
  username: string,
  groupId: number
) => {
  const messagesCollection = await getGroupIdUsersCollection();

  await messagesCollection.updateOne(
    { g: groupId, u: username.toLowerCase() },
    { $set: { f: true, p: new Date() } },
    { upsert: true }
  );
};

export const updateSendMessage = async (username: string, groupId: number) => {
  const messagesCollection = await getGroupIdUsersCollection();

  await messagesCollection.updateOne(
    { g: groupId, u: username.toLowerCase() },
    { $set: { s: true, p: new Date() } },
    { upsert: true }
  );
};

