import { DB } from "./db";

const getGroupIdCollection = async () => {
  return (await DB()).collection("groupId");
};

export const getGroupId = async (groupId: string) => {
  const groupIdCollection = await getGroupIdCollection();

  const result = await groupIdCollection.findOne(
    {
      groupId: Number(groupId),
    },
    { projection: { database: 0 } }
  );

  return result;
};

export const incrementCurrentCount = async (groupId: number) => {
  const groupIdCollection = await getGroupIdCollection();

  await groupIdCollection.updateOne(
    { groupId },
    {
      $inc: { currentCount: 1 },
      $set: { dateUpdated: new Date() },
    }
  );
};
