import { DB2 } from './db';

const getGroupIdCollection = async () => {
  return (await DB2()).collection('groupId');
};

export const getGroupId = async (groupId: string) => {
  const groupIdCollection = await getGroupIdCollection();

  const result = await groupIdCollection.findOne(
    {
      groupId: String(groupId),
    },
    { projection: { history: 0, database: 0, dateUpdated: 0, _id: 0 } }
  );

  return result;
};

export const incrementCurrentCount = async (groupId: string) => {
  const groupIdCollection = await getGroupIdCollection();

  await groupIdCollection.updateOne(
    { groupId },
    {
      $inc: { currentCount: 1 },
      $set: { dateUpdated: new Date() },
    }
  );
};
