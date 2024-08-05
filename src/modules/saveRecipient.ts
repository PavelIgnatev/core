import { red, yellow } from 'colors/safe';

import { Dialogue } from '../@types/Dialogue';
import GramJs from '../common/gramjs/tl/api';
import { incrementMessageCount, updateAccountById } from '../db/accounts';
import { updateDialogue } from '../db/dialogues';
import { incrementCurrentCount } from '../db/groupId';
import { getCombinedMessages } from '../helpers/getCombinedMessages';
import { sleep } from '../helpers/sleep';

export const saveRecipient = async (
  accountId: string,
  recipient: GramJs.users.UserFull,
  recipientDb: Dialogue & { username?: string },
  messages: { id: number; text: string; fromId: string; date: number }[],
  status: 'create' | 'update',
  addedData: Record<string, unknown> = {}
) => {
  console.log(`[${accountId}] Initialize sub module`, yellow('SAVE RECIPIENT'));

  const {
    id: recipientId,
    phone,
    username,
    firstName,
    lastName = '',
  } = recipient.users[0] as GramJs.User;
  const {
    fullUser: { about },
  } = recipient;

  const {
    groupId,
    recipientUsername,
    username: varSecondUsername,
    recipientPhone,
  } = recipientDb;

  const data = {
    groupId,
    accountId,
    recipientId: String(recipientId),
    recipientUsername: (
      username ||
      recipientUsername ||
      varSecondUsername ||
      ''
    ).toLowerCase(),
    recipientTitle: `${firstName} ${lastName}`.trim(),
    recipientBio: about || '',
    recipientPhone: phone || recipientPhone || null,
    messages,
    step: getCombinedMessages(messages).length,
    ...addedData,
  };

  let isSave = false;
  while (!isSave) {
    try {
      await updateDialogue(data);

      if (status === 'create') {
        await updateAccountById(accountId, {
          remainingTime: new Date(new Date().getTime() + 18000000),
        });

        await incrementMessageCount(accountId);
        await incrementCurrentCount(groupId);
      }

      console.log(
        `[${accountId}] Saving the recipient information to the database is complete`
      );
      isSave = true;
    } catch (error: any) {
      console.log(
        red(
          `[${accountId}] Error occurred while saving recipient: ${error.message}`
        )
      );

      await sleep(3000);
    }
  }
};
