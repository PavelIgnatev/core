import GramJs from '../../../gramjs/tl/api';
import { Account } from '../../@types/Account';
import { Dialogue } from '../../@types/Dialogue';
import { incrementMessageCount, updateAccountById } from '../../db/accounts';
import { updateDialogue } from '../../db/dialogues';
import { incrementCurrentCount } from '../../db/groupId';
import { updateSendMessage } from '../../db/groupIdUsers';
import { getCombinedMessages } from '../../helpers/getCombinedMessages';
import { sleep } from '../../helpers/helpers';
import { sendToMainBot } from '../../helpers/sendToMainBot';

export const saveRecipient = async (
  accountId: string,
  recipientId: string,
  recipientAccessHash: string,
  recipient: GramJs.users.UserFull,
  recipientDb: Partial<Dialogue> & { username?: string },
  messages: { id: number; text: string; fromId: string; date: number }[],
  status: 'create' | 'update',
  addedData: Record<string, unknown> = {},
) => {
  let isSave = false;
  while (!isSave) {
    try {
      const {
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
        recipientId,
        recipientAccessHash,
        recipientUsername: recUsername,
        recipientTitle: `${firstName} ${lastName}`.trim(),
        recipientBio: about || '',
        aiName: recipientDb?.aiName || null,
        aiGender: recipientDb?.aiGender || null,
        recipientPhone:
          (status === 'create' && recipientDb?.username?.includes('+')
            ? recipientDb.username.replace('+', '')
            : null) ||
          phone ||
          recipientPhone ||
          null,
        messages,
        step: getCombinedMessages(messages).length,
        read: false,
        ...addedData,
      } as Dialogue;

      await updateDialogue({ ...data, dateUpdated: new Date() });

      console.log({
        accountId,
        message: `[SAVE_RECIPIENT]`,
        data,
      });

      if (status === 'create') {
        if (accountId.includes('-prefix-premium')) {
          await updateAccountById(accountId, {
            remainingTime: new Date(new Date().getTime() + 1500000),
          });
        } else {
          await updateAccountById(accountId, {
            remainingTime: new Date(new Date().getTime() + 7200000),
          });
        }

        await updateSendMessage(recipientDb.username!, String(groupId), {
          s: true,
          p: new Date(),
        });

        await incrementMessageCount(accountId);
        await incrementCurrentCount(String(groupId));
      }
      isSave = true;
    } catch (error: any) {
      await sendToMainBot(`** SAVE_RECIPIENT_ERROR **
ID: ${accountId}
ERROR: ${error.message}`);

      await sleep(3000);
    }
  }
};
