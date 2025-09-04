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
  account: Account,
  recipientId: string,
  recipientAccessHash: string,
  recipient: GramJs.users.UserFull,
  recipientDb: Partial<Dialogue> & { username?: string },
  messages: { id: number; text: string; fromId: string; date: number }[],
  status: 'create' | 'update',
  addedData: Record<string, unknown> = {}
) => {
  const { accountId, phone: accountPhone } = account;

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
        if (accountPhone && /^\+7/.test(accountPhone)) {
          await updateAccountById(accountId, {
            remainingTime: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
          });
        } else {
          await updateAccountById(accountId, {
            remainingTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
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