import axios from 'axios';

import { sendToMainBot } from '../helpers/sendToMainBot';

export const addBitrixLead = async (
  webhook: string,
  fields: Record<string, any>
) => {
  try {
    const response = await axios.post(`${webhook}/crm.lead.add.json`, {
      fields,
    });

    return response.data;
  } catch (error) {
    await sendToMainBot(
      `** ADD_BITRIX_LEAD_ERROR **
ERROR: ${error}
WEBHOOK: ${webhook}
FIELDS: ${JSON.stringify(fields)}`
    );
    throw error;
  }
};
