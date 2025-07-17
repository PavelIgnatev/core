import { GroupId } from '../@types/GroupId';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { coreDB } from './db';
import { validateGroupId } from './schemas/groupId';

const getGroupIdCollection = async () => {
  return (await coreDB()).collection('groupId');
};

export const getGroupId = async (groupId: string) => {
  const groupIdCollection = await getGroupIdCollection();

  const result = await groupIdCollection.findOne<GroupId>(
    {
      groupId: String(groupId),
    },
    { projection: { history: 0, dateUpdated: 0, _id: 0 } }
  );

  if (result) {
    const correctedResult = {
      // @ts-ignore
      addedQuestion: null,
      // @ts-ignore
      addedInformation: null,
      // @ts-ignore
      part: null,
      // @ts-ignore
      flowHandling: null,
      ...result,
      target: 10000000,
      leadDefinition:
        result.leadDefinition ||
        `НЕ СЧИТАЙ НИКОГО ЛИДОМ, ЛИДОМ ВЫДЕЛЯТЬ НЕЛЬЗЯ, ЕСТЬ ТОЛЬКО NEGATIVE | CONTINUE
DON'T CONSIDER ANYONE A LEAD, THERE ARE NO LEADS, ONLY NEGATIVE | CONTINUE`,
      leadGoal: result.leadGoal || result.goal,
    };

    try {
      validateGroupId(correctedResult);
    } catch (error) {
      await sendToMainBot(`** GROUP_ID_VALIDATION_ERROR **
GROUP_ID: ${groupId}
ERROR: ${error instanceof Error ? error.message : error}`);
      return null;
    }

    return correctedResult;
  }

  return null;
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
