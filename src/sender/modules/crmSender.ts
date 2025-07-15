import { addAmoLead } from '../api/amo';
import { sendToApi } from '../api/api';
import { addBitrixLead } from '../api/bitrix';
import { getCrm } from '../db/crm';
import { getDialogueCrm } from '../db/dialogues';
import { formatDialogue } from '../helpers/formatDialogue';
import { sendToMainBot } from '../helpers/sendToMainBot';

export const crmSender = async (
  groupId: string,
  recipientId: string,
  reason: string,
  messages: Array<{ id: number; text: string; fromId: string; date: number }>
) => {
  const crm = await getCrm(groupId);
  if (!crm) {
    return;
  }

  const dialogue = await getDialogueCrm(groupId, recipientId);
  if (!dialogue) {
    await sendToMainBot(`** CRM_SENDER_ERROR: NO_CRM_DATA **
GROUP_ID: ${groupId}
RECIPIENT_ID: ${recipientId}
    `);
    return;
  }

  try {
    if (crm.type === 'bitrix') {
      const lastMessage = messages[messages.length - 1];
      const firstMessage = messages[0];

      const fields = {
        TITLE: `${dialogue.recipientTitle} (${
          dialogue.recipientUsername
            ? `@${dialogue.recipientUsername}`
            : dialogue.recipientPhone
              ? dialogue.recipientPhone
              : 'NO_DATA'
        })`,
        SOURCE_DESCRIPTION: `${dialogue?.recipientPhone ? `Телефон: ${dialogue.recipientPhone}\n` : ''}Юзернейм: ${dialogue?.recipientUsername || ''}
Комментарий: ${reason}`,
        COMMENTS: `GROUP_ID: ${dialogue.groupId}
RECIPIENT_ID: ${recipientId}
ДИАЛОГ:
${formatDialogue(messages, recipientId)}`,
        DATE_CREATE: new Date(firstMessage.date * 1000).toISOString(),
        DATE_MODIFY: new Date(lastMessage.date * 1000).toISOString(),
      };

      await addBitrixLead(crm.webhook, fields);
    } else if (crm.type === 'amo') {
      const lastMessage = messages[messages.length - 1];
      const firstMessage = messages[0];

      const body = {
        TITLE_RECIPIENT: dialogue.recipientTitle,
        TITLE_USERNAME: dialogue.recipientUsername,
        TITLE_PHONE: dialogue.recipientPhone,
        TITLE_FALLBACK: 'NEW_LEAD',

        DESC_PHONE: dialogue.recipientPhone,
        DESC_USERNAME: dialogue.recipientUsername,
        DESC_COMMENT: reason,

        COMMENTS_GROUP_ID: dialogue.groupId,
        COMMENTS_RECIPIENT_ID: recipientId,
        COMMENTS_DIALOGUE: formatDialogue(messages, recipientId),

        DATE_CREATE: new Date(firstMessage.date * 1000).toISOString(),
        DATE_MODIFY: new Date(lastMessage.date * 1000).toISOString(),
      };

      await addAmoLead(crm.webhook, body);
    } else if (crm.type === 'api') {
      const formattedMessages = messages.map((msg) => ({
        text: msg.text,
        from: (msg.fromId === dialogue.recipientId ? 'lead' : 'ai') as
          | 'lead'
          | 'ai',
        date: msg.date * 1000,
      }));

      await sendToApi(crm.webhook, {
        status: 'lead',
        reason,

        leadId: dialogue.recipientId,
        leadTitle: dialogue.recipientTitle,
        leadUsername: dialogue.recipientUsername,
        leadPhone: dialogue.recipientPhone,
        leadBio: dialogue.recipientBio,

        messages: formattedMessages,
      });
    }
  } catch (error) {
    await sendToMainBot(`** CRM_SENDER_ERROR **
TYPE: ${crm.type}
GROUP_ID: ${groupId}
RECIPIENT_ID: ${recipientId}
ERROR: ${error}
    `);
  }
};
