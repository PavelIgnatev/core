import { addBitrixLead, updateBitrixLead } from '../api/bitrix';
import { getCrm } from '../db/crm';
import { getDialogueCrm, updateDialogue } from '../db/dialogues';
import { sendToMainBot } from '../helpers/sendToMainBot';

export const crmSender = async (
  accountId: string,
  recipientId: string,
  messages: Array<{ id: number; text: string; fromId: string; date: number }>,
  analysis: {
    status: 'interesting' | 'normal' | 'stop';
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

  if (crm.type === 'bitrix') {
    const lastMessage = messages[messages.length - 1];
    const firstMessage = messages[0];

    const crmData = await getDialogueCrm(accountId, recipientId);

    if (!crmData) {
      await sendToMainBot(`** CRM_SENDER_ERROR: NO_CRM_DATA **
ACCOUNT_ID: ${accountId}
RECIPIENT_ID: ${recipientId}
      `);
      return;
    }

    const fields = {
      TITLE: `${crmData.recipientTitle} (${crmData.recipientUsername ? `@${crmData.recipientUsername}` : crmData.recipientPhone ? crmData.recipientPhone : 'NO_DATA'})`,
      SOURCE_DESCRIPTION: `ID: ${accountId};
RID: ${recipientId}`,
      COMMENTS: `Телефон: ${crmData?.recipientPhone || ''}
Юзернейм: ${crmData?.recipientUsername || ''}
Комментарий: ${analysis.reason}`,
      DATE_CREATE: new Date(firstMessage.date * 1000).toISOString(),
      DATE_MODIFY: new Date(lastMessage.date * 1000).toISOString(),
    };

    const dialogueUpdate = {
      accountId,
      recipientId,
      extra: {
        ...crmData.extra,
        status: analysis.status,
        reason: analysis.reason,
      },
    };

    try {
      if (crmData.extra?.crmId) {
        await updateBitrixLead(crm.webhook, crmData.extra.crmId, fields);
      } else {
        const result = await addBitrixLead(crm.webhook, fields);
        if (result.result) {
          dialogueUpdate.extra.crmId = String(result.result);
        }
      }

      await updateDialogue(dialogueUpdate);
    } catch (error) {
      await updateDialogue(dialogueUpdate);

      await sendToMainBot(`** CRM_SENDER_ERROR **
ERROR: ${error}
ACCOUNT_ID: ${accountId}
RECIPIENT_ID: ${recipientId}
      `);
    }
  }
};
