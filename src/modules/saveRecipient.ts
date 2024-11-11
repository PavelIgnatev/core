import GramJs from '../common/gramjs/tl/api';

import { Dialogue } from '../@types/Dialogue';
import { Account } from '../@types/Account';

import { incrementMessageCount, updateAccountById } from '../db/accounts';
import { updateDialogue } from '../db/dialogues';
import { incrementCurrentCount } from '../db/groupId';
import { getCombinedMessages } from '../helpers/getCombinedMessages';
import { sleep } from '../helpers/sleep';
import { updateSendMessage } from '../db/groupIdUsers';

export const saveRecipient = async (
  accountId: string,
  recipient: GramJs.users.UserFull,
  recipientDb: Dialogue & { username: string },
  messages: { id: number; text: string; fromId: string; date: number }[],
  status: 'create' | 'update',
  addedData: Record<string, unknown> = {},
  accountByID: Account | null = null
) => {
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
  const recUsername = (
    username ||
    recipientUsername ||
    varSecondUsername ||
    ''
  ).toLowerCase();

  const data = {
    groupId,
    accountId,
    recipientId: String(recipientId),
    recipientUsername: recUsername,
    recipientTitle: `${firstName} ${lastName}`.trim(),
    recipientBio: about || '',
    recipientPhone: phone || recipientPhone || null,
    messages,
    step: getCombinedMessages(messages).length,
    ...addedData,
  } as Dialogue;

  let isSave = false;
  while (!isSave) {
    try {
      await updateDialogue(data);
      console.log({
        accountId,
        message: `**SAVE RECIPIENT**`,
        data,
      });

      if (status === 'create') {
        const messageCount = accountByID?.messageCount || 0;
        const multiplier = messageCount < 40 ? 1.5 : 1;
        if (accountId.includes('-prefix-premium')) {
          await updateAccountById(accountId, {
            remainingTime: new Date(new Date().getTime() + 1500000),
            multiplier: 1,
          });
        } else {
          await updateAccountById(accountId, {
            remainingTime: new Date(
              new Date().getTime() + 7200000 * multiplier
            ),
            multiplier,
          });
        }

        await updateSendMessage(recipientDb.username, String(groupId));

        await incrementMessageCount(accountId);
        await incrementCurrentCount(String(groupId));
      }
      isSave = true;
    } catch (error: any) {
      console.error({
        accountId,
        message: new Error(
          `Error occurred while saving recipient: ${error.message}`
        ),
      });

      await sleep(3000);
    }
  }
};
