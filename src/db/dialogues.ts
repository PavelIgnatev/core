import { DB } from './db';
import { Dialogue } from '../@types/Dialogue';

const getDialoguesCollection = async () => {
  return (await DB()).collection('dialogues');
};

export const getDialogue = async (accountId: string, recipientId: string) => {
  const dialoguesCollection = await getDialoguesCollection();

  const dialogue = await dialoguesCollection.findOne<Dialogue>({
    accountId,
    recipientId,
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

export const getDialogs = async (accountId: string) => {
  const dialoguesCollection = await getDialoguesCollection();

  const dialogues = await dialoguesCollection
    .find<{
      recipientId: string;
      reason?: string;
      automaticReason?: string;
      blocked?: boolean;
      stopped?: boolean;
      read?: boolean;
    }>(
      {
        accountId,
      },
      {
        projection: {
          _id: 0,
          recipientId: 1,
          blocked: 1,
          automaticReason: 1,
          read: 1,
          reason: 1,
        },
      }
    )
    .toArray();

  return dialogues;
};

export const getDialogueByMessageId = async (
  accountId: string,
  messageIds: number[]
) => {
  const dialoguesCollection = await getDialoguesCollection();

  const dialogue = await dialoguesCollection.findOne<Dialogue>({
    accountId,
    messages: { $elemMatch: { id: { $in: messageIds } } },
  });

  return dialogue;
};

export const getRecipientUsernameAndPhone = async (
  accountId: string,
  recipientId: string
) => {
  const dialoguesCollection = await getDialoguesCollection();

  const dialogues = await dialoguesCollection.findOne<{
    recipientPhone?: string;
    recipientUsername?: string;
  }>(
    {
      accountId,
      recipientId,
    },
    {
      projection: {
        _id: 0,
        recipientUsername: 1,
        recipientPhone: 1,
      },
    }
  );

  return dialogues;
};

export const getPingDialogues = async (accountId: string) => {
  const dialoguesCollection = await getDialoguesCollection();

  const twelveHoursAgo = new Date();
  twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 6);

  const hours24Ago = new Date();
  hours24Ago.setHours(hours24Ago.getHours() - 24);

  const pingDialogs = await dialoguesCollection
    .find<Dialogue>({
      accountId,
      step: 3,
      ping: { $ne: true },
      stopped: { $ne: true },
      blocked: { $ne: true },
      dateUpdated: { $gte: hours24Ago, $lte: twelveHoursAgo },
    })
    .toArray();

  return pingDialogs;
};

export const getDialogsAutomationCheck = async (accountId: string) => {
  const dialoguesCollection = await getDialoguesCollection();

  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000);
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  const ninetySixHoursAgo = new Date(now.getTime() - 96 * 60 * 60 * 1000);

  const automationDialogs = await dialoguesCollection
    .find<Dialogue>({
      accountId,
      automaticCheckDate: null,
      dateUpdated: {
        $gte: fortyEightHoursAgo,
        $lte: oneHourAgo,
      },
    })
    .toArray();

  const lastAutomationDialogs = await dialoguesCollection
    .find<Dialogue>({
      accountId,
      lastAutomaticCheckDate: null,
      automaticReason: null,
      lastAutomaticReason: null,
      automaticCheckDate: {
        $gte: ninetySixHoursAgo,
        $lte: fortyEightHoursAgo,
      },
    })
    .toArray();

  return [automationDialogs, lastAutomationDialogs];
};

export const getGlobalCheckDialogues = async (accountId: string) => {
  const dialoguesCollection = await getDialoguesCollection();

  const twentyFiveHoursAgo = new Date();
  twentyFiveHoursAgo.setHours(twentyFiveHoursAgo.getHours() - 25);

  const fortyEightHoursAgo = new Date();
  fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

  const pingDialogs = await dialoguesCollection
    .find<Dialogue>({
      accountId,
      dateUpdated: { $gte: fortyEightHoursAgo, $lte: twentyFiveHoursAgo },
      globalCheck: { $ne: true },
    })
    .toArray();

  return pingDialogs;
};

export const getManualControlDialogues = async (accountId: string) => {
  const dialoguesCollection = await getDialoguesCollection();

  const dialogs = await dialoguesCollection
    .find<Dialogue>({
      accountId,
      stopped: true,
      blocked: { $ne: true },
      managerMessage: { $ne: null },
    })
    .toArray();

  return dialogs;
};

export const updateDialogue = async (dialogue: Dialogue) => {
  const dialoguesCollection = await getDialoguesCollection();

  await dialoguesCollection.updateOne(
    {
      accountId: dialogue.accountId,
      recipientId: dialogue.recipientId,
    },
    {
      $set: {
        ...dialogue,
        dateUpdated: new Date(),
      },
      $setOnInsert: {
        dateCreated: new Date(),
      },
    },
    {
      upsert: true,
    }
  );
};

export const updateAutomaticDialogueWithoutReason = async (
  accountId: string,
  recipientId: string,
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
        ...additionalData,
        dateUpdated: new Date(),
      },
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

export const updateBlockedDialogue = async (
  accountId: string,
  recipientId: string,
  reason: string
) => {
  const dialoguesCollection = await getDialoguesCollection();

  await dialoguesCollection.updateOne(
    {
      accountId,
      recipientId,
    },
    {
      $set: {
        reason,
        blocked: true,
        stopped: true,
        viewed: false,
        managerMessage: null,
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
