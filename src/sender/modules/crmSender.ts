import { addAmoLead } from '../api/amo';
import { sendToApi } from '../api/api';
import { addBitrixLead } from '../api/bitrix';
import { getAccountById } from '../db/accounts';
import { getCrm } from '../db/crm';
import { getDialogueCrm, updateSimpleDialogue } from '../db/dialogues';
import { formatDialogue } from '../helpers/formatDialogue';
import { sendErrorCrmBot } from '../helpers/sendErrorCrmBot';

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
    await sendErrorCrmBot(`** CRM_SENDER_ERROR: NO_CRM_DATA **
GROUP_ID: ${groupId}
RECIPIENT_ID: ${recipientId}
    `);
    return;
  }

  const account = await getAccountById(dialogue.accountId);
  const aiBotName = account.firstName;
  const aiBotUsername = account.username;

  try {
    if (crm.type === 'bitrix') {
      const fields = {
        TITLE: `${dialogue.recipientTitle} (${
          dialogue.recipientUsername
            ? `@${dialogue.recipientUsername}`
            : dialogue.recipientPhone
              ? dialogue.recipientPhone
              : 'NO_DATA'
        })`,
        SOURCE_DESCRIPTION: `${dialogue?.recipientPhone ? `Телефон: ${dialogue.recipientPhone}\n` : ''}Юзернейм: ${dialogue.recipientUsername}${dialogue.recipientBio ? `\nОписание: ${dialogue.recipientBio}` : ''}
Комментарий: ${reason}`,
        COMMENTS: `GROUP_ID: ${dialogue.groupId}
RECIPIENT_ID: ${recipientId}
AI_BOT_NAME: ${aiBotName}
AI_BOT_USERNAME: ${aiBotUsername}
DIALOGUE:
${formatDialogue(messages, recipientId)}`,
        DATE_CREATE: dialogue._id!.getTimestamp().toISOString(),
        DATE_MODIFY: new Date().toISOString(),
      };

      await addBitrixLead(crm.webhook, fields);

      await updateSimpleDialogue(dialogue.accountId, recipientId, {
        crmSent: true,
        crmDate: new Date(),
      });
    } else if (crm.type === 'amo') {
      const body = {
        TITLE_RECIPIENT: dialogue.recipientTitle,
        TITLE_USERNAME: dialogue.recipientUsername,
        TITLE_PHONE: dialogue.recipientPhone || 'NO_DATA',
        TITLE_FALLBACK: 'NEW_LEAD',

        DESC_USERNAME: dialogue.recipientUsername,
        DESC_PHONE: dialogue.recipientPhone || 'NO_DATA',
        DESC_BIO: dialogue.recipientBio || 'NO_DATA',
        DESC_COMMENT: reason,

        COMMENTS_GROUP_ID: dialogue.groupId,
        COMMENTS_RECIPIENT_ID: recipientId,
        COMMENTS_AI_BOT_NAME: aiBotName,
        COMMENTS_AI_BOT_USERNAME: aiBotUsername,
        COMMENTS_DIALOGUE: formatDialogue(messages, recipientId),

        DATE_CREATE: dialogue._id!.getTimestamp().toISOString(),
        DATE_MODIFY: new Date().toISOString(),
      };

      await addAmoLead(crm.webhook, body);

      await updateSimpleDialogue(dialogue.accountId, recipientId, {
        crmSent: true,
        crmDate: new Date(),
      });
    } else if (crm.type === 'api') {
      const formattedMessages = messages.map((msg) => ({
        text: msg.text,
        from:
          msg.fromId === dialogue.recipientId
            ? ('lead' as const)
            : ('ai' as const),
        date: msg.date * 1000,
      }));

      await sendToApi(crm.webhook, {
        status: 'lead',
        reason,
        aiBotName,
        aiBotUsername,

        groupId: dialogue.groupId,
        leadId: dialogue.recipientId,
        leadTitle: dialogue.recipientTitle,
        leadUsername: dialogue.recipientUsername,
        leadPhone: dialogue.recipientPhone || 'NO_DATA',
        leadBio: dialogue.recipientBio || 'NO_DATA',

        messages: formattedMessages,

        dateCreated: dialogue._id!.getTimestamp().toISOString(),
        dateUpdated: new Date().toISOString(),
      });

      await updateSimpleDialogue(dialogue.accountId, recipientId, {
        crmSent: true,
        crmDate: new Date(),
      });
    } else {
      await sendErrorCrmBot(`** CRM_SENDER_ERROR **
TYPE: NO_CRM_TYPE
GROUP_ID: ${groupId}
RECIPIENT_ID: ${recipientId}
ERROR: CRM_TYPE_NOT_FOUND`);

      await updateSimpleDialogue(dialogue.accountId, recipientId, {
        crmSent: false,
        crmError: 'CRM_TYPE_NOT_FOUND',
        crmDate: new Date(),
      });
    }
  } catch (error: any) {
    await sendErrorCrmBot(`** CRM_SENDER_ERROR **
TYPE: ${crm.type}
GROUP_ID: ${groupId}
RECIPIENT_ID: ${recipientId}
ERROR: ${error.message}`);

    await updateSimpleDialogue(dialogue.accountId, recipientId, {
      crmSent: false,
      crmError: error.message,
      crmDate: new Date(),
    });
  }
};
