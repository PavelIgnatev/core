import { addAmoLead } from '../api/amo';
import { sendToApiUrl } from '../api/apiUrl';
import { addBitrixLead, updateBitrixLead } from '../api/bitrix';
import { getCrm } from '../db/crm';
import { getDialogueCrm, updateDialogue } from '../db/dialogues';
import { formatDialogue } from '../helpers/formatDialogue';
import { sendToMainBot } from '../helpers/sendToMainBot';

export const crmSender = async (
  accountId: string,
  recipientId: string,
  messages: Array<{ id: number; text: string; fromId: string; date: number }>,
  analysis: {
    status: 'meeting' | 'normal' | 'negative';
    reason: string;
  }
) => {
  const prefix = accountId.includes('-prefix-')
    ? accountId.split('-prefix-')[1]
    : null;

  if (!prefix) {
    return;
  }

  const crm = await getCrm(prefix);
  if (!crm) {
    return;
  }

  const dialogue = await getDialogueCrm(accountId, recipientId);
  if (!dialogue) {
    await sendToMainBot(`** CRM_SENDER_ERROR: NO_CRM_DATA **
ACCOUNT_ID: ${accountId}
RECIPIENT_ID: ${recipientId}
    `);
    return;
  }

  const dialogueUpdate = {
    accountId,
    recipientId,
    extra: {
      ...dialogue.extra,
      status: analysis.status,
      reason: analysis.reason,
    },
  };

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
Комментарий: ${analysis.reason}`,
        COMMENTS: `GROUP_ID: ${dialogue.groupId}
ACCOUNT_ID: ${accountId}
RECIPIENT_ID: ${recipientId}
ДИАЛОГ:
${formatDialogue(messages, recipientId)}`,
        DATE_CREATE: new Date(firstMessage.date * 1000).toISOString(),
        DATE_MODIFY: new Date(lastMessage.date * 1000).toISOString(),
      };

      if (dialogue.extra?.crmId) {
        await updateBitrixLead(crm.webhook, dialogue.extra.crmId, fields);
      } else {
        const result = await addBitrixLead(crm.webhook, fields);
        if (result.result) {
          dialogueUpdate.extra.crmId = String(result.result);
        }
      }
    } else if (crm.type === 'amo') {
      const lastMessage = messages[messages.length - 1];
      const firstMessage = messages[0];

      const body = {
        // Данные для TITLE
        TITLE_RECIPIENT: dialogue.recipientTitle,
        TITLE_USERNAME: dialogue.recipientUsername,
        TITLE_PHONE: dialogue.recipientPhone,
        TITLE_FALLBACK: 'NEW_LEAD',

        // Данные для SOURCE_DESCRIPTION
        DESC_PHONE: dialogue.recipientPhone,
        DESC_USERNAME: dialogue.recipientUsername,
        DESC_COMMENT: analysis.reason,

        // Данные для COMMENTS
        COMMENTS_GROUP_ID: dialogue.groupId,
        COMMENTS_ACCOUNT_ID: accountId,
        COMMENTS_RECIPIENT_ID: recipientId,
        COMMENTS_DIALOGUE: formatDialogue(messages, recipientId),

        // Даты
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

      await sendToApiUrl(crm.apiUrl, {
        status: analysis.status,
        reason: analysis.reason,

        leadId: dialogue.recipientId,
        leadTitle: dialogue.recipientTitle,
        leadUsername: dialogue.recipientUsername,
        leadPhone: dialogue.recipientPhone,
        leadBio: dialogue.recipientBio,

        messages: formattedMessages,
      });
    }

    await updateDialogue(dialogueUpdate);
  } catch (error) {
    await updateDialogue(dialogueUpdate);

    await sendToMainBot(`** CRM_SENDER_ERROR **
TYPE: ${crm.type}
ACCOUNT_ID: ${accountId}
RECIPIENT_ID: ${recipientId}
ERROR: ${error}
    `);
  }
};
