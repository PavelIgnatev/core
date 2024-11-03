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
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const automationDialogs = await dialoguesCollection
    .find<Dialogue>({
      accountId,
      automationCheck: { $ne: true },
      dateUpdated: {
        $gte: twentyFourHoursAgo,
        $lte: oneHourAgo,
      },
    })
    .toArray();

  return automationDialogs;
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

export const updateMessagesViewedStatusById = async (
  accountId: string,
  recipientId: string,
  messageId: number
) => {
  const dialoguesCollection = await getDialoguesCollection();

  await dialoguesCollection.updateOne(
    {
      accountId,
      recipientId,
    },
    {
      $set: {
        'messages.$[element].viewed': true,
      },
    },
    {
      arrayFilters: [{ 'element.id': { $lte: messageId } }],
    }
  );
};

export const updateAutomaticDialogue = async (
  accountId: string,
  recipientId: string,
  addedData: Record<string, unknown>
) => {
  const dialoguesCollection = await getDialoguesCollection();

  await dialoguesCollection.updateOne(
    {
      accountId,
      recipientId,
    },
    {
      $set: {
        ...addedData,
        blocked: true,
        stopped: true,
        viewed: false,
        managerMessage: null,
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
