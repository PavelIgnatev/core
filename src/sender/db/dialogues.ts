import { Dialogue } from '../@types/Dialogue';
import { coreDB } from './db';

const getDialoguesCollection = async () => {
  return (await coreDB()).collection('dialogues');
};

export const getDialogue = async (accountId: string, recipientId: string) => {
  const dialoguesCollection = await getDialoguesCollection();

  const dialogue = await dialoguesCollection.findOne<Dialogue>({
    accountId,
    recipientId,
  });

  return dialogue;
};

export const getDialogueByGidRid = async (
  recipientId: string,
  groupId: string
) => {
  const dialoguesCollection = await getDialoguesCollection();

  const dialogue = await dialoguesCollection.findOne<Dialogue>({
    recipientId,
    groupId,
  });

  return dialogue;
};

export const getDialogsIds = async (accountId: string) => {
  const dialoguesCollection = await getDialoguesCollection();

  const withoutReasonIds = await dialoguesCollection.distinct('recipientId', {
    accountId,
    automaticReason: null,
  });
  const withReasonIds = await dialoguesCollection.distinct('recipientId', {
    accountId,
    automaticReason: { $ne: null },
  });
  return [withoutReasonIds, withReasonIds];
};

export const getBlockedIds = async (accountId: string) => {
  const dialoguesCollection = await getDialoguesCollection();

  const ids = await dialoguesCollection.distinct('recipientId', {
    accountId,
    blocked: true,
  });

  return ids;
};

export const getAccountDialogs = async (accountId: string) => {
  const dialoguesCollection = await getDialoguesCollection();

  const dialogues = await dialoguesCollection
    .find<Dialogue>(
      {
        accountId,
      },
      {
        projection: {
          _id: 0,
          recipientId: 1,
          recipientAccessHash: 1,
          blocked: 1,
          automaticReason: 1,
          status: 1,
          read: 1,
          reason: 1,
          dateLastOnline: 1,
        },
      }
    )
    .toArray();

  return dialogues;
};

export const getUnreadFirstDialogsIds = async (accountId: string) => {
  if (!accountId.includes('female-aisender')) {
    return [];
  }

  const dialoguesCollection = await getDialoguesCollection();

  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const twoDayAgo = new Date();
  twoDayAgo.setDate(twoDayAgo.getDate() - 2);

  const sevenDayAgo = new Date();
  sevenDayAgo.setDate(sevenDayAgo.getDate() - 7);

  const unreadIds = await dialoguesCollection.distinct('recipientId', {
    step: 1,
    accountId,
    read: { $ne: true },
    stopped: { $ne: true },
    blocked: { $ne: true },
    dateUpdated: { $gte: twoDayAgo, $lte: oneDayAgo },
    dateCreated: { $gte: sevenDayAgo },
  });

  return unreadIds;
};

export const getPingDialogsIds = async (accountId: string) => {
  const dialoguesCollection = await getDialoguesCollection();

  const twelveHoursAgo = new Date();
  twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 6);

  const hours24Ago = new Date();
  hours24Ago.setHours(hours24Ago.getHours() - 24);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const pingDialogsIds = await dialoguesCollection.distinct('recipientId', {
    accountId,
    step: 3,
    ping: { $ne: true },
    stopped: { $ne: true },
    blocked: { $ne: true },
    dateUpdated: { $gte: hours24Ago, $lte: twelveHoursAgo },
    dateCreated: { $gte: oneWeekAgo },
  });

  return pingDialogsIds;
};

export const getManualControlDialogsIds = async (accountId: string) => {
  const dialoguesCollection = await getDialoguesCollection();

  const manualControlDialogsIds = await dialoguesCollection.distinct(
    'recipientId',
    {
      accountId,
      blocked: { $ne: true },
      managerMessage: { $ne: null },
    }
  );

  return manualControlDialogsIds;
};

export const updateDialogue = async (dialogue: Partial<Dialogue>) => {
  const dialoguesCollection = await getDialoguesCollection();

  await dialoguesCollection.updateOne(
    {
      accountId: dialogue.accountId,
      recipientId: dialogue.recipientId,
    },
    {
      $set: dialogue,
      $setOnInsert: {
        dateCreated: new Date(),
      },
    },
    {
      upsert: true,
    }
  );
};

export const updateSimpleDialogue = async (
  accountId: string,
  recipientId: string,
  data: Record<string, unknown>
) => {
  const dialoguesCollection = await getDialoguesCollection();

  await dialoguesCollection.updateOne(
    {
      accountId,
      recipientId,
    },
    {
      $set: data,
    }
  );
};

export const updateAutomaticDialogue = async (
  accountId: string,
  recipientId: string,
  automaticReason: string,
  additionalData?: Record<string, unknown>
) => {
  const dialoguesCollection = await getDialoguesCollection();

  await dialoguesCollection.updateOne(
    {
      accountId,
      recipientId,
    },
    {
      $set: {
        blocked: true,
        stopped: true,
        viewed: false,
        managerMessage: null,
        automaticReason,
        ...additionalData,
        dateUpdated: new Date(),
      },
    }
  );
};

export const updateDateCheckedIds = async (
  accountId: string,
  ids: string[]
) => {
  const dialoguesCollection = await getDialoguesCollection();

  await dialoguesCollection.updateMany(
    {
      accountId,
      recipientId: { $in: ids },
    },
    {
      $set: {
        dateAutomaticCheck: new Date(),
      },
    }
  );
};

export const getRandomPhone = async (): Promise<string | null> => {
  const dialoguesCollection = await getDialoguesCollection();

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2);

  const pipeline = [
    {
      $match: {
        dateCreated: { $gte: oneMonthAgo },
        recipientPhone: { $ne: null },
      },
    },
    {
      $project: {
        _id: 0,
        recipientPhone: 1,
      },
    },
    { $sample: { size: 1 } },
  ];

  const result = await dialoguesCollection.aggregate(pipeline).toArray();
  if (result.length > 0 && result[0].recipientPhone) {
    return result[0].recipientPhone;
  }

  return null;
};

export const hasDialog4HoursAgo = async (accountId: string) => {
  const dialoguesCollection = await getDialoguesCollection();

  const fourHoursAgo = new Date();
  fourHoursAgo.setHours(fourHoursAgo.getHours() - 4);

  const dialogue = await dialoguesCollection.findOne(
    {
      accountId,
      $or: [
        { dateCreated: { $gte: fourHoursAgo } },
        { dateUpdated: { $gte: fourHoursAgo } },
      ],
    },
    { projection: { _id: 1 } }
  );

  return Boolean(dialogue);
};
