import axios from 'axios';

import { sendErrorCrmBot } from '../helpers/sendErrorCrmBot';

interface BitrixLeadFields {
  TITLE: string;
  SOURCE_DESCRIPTION: string;
  COMMENTS: string;
  DATE_CREATE: string;
  DATE_MODIFY: string;
}

export const addBitrixLead = async (
  webhook: string,
  fields: BitrixLeadFields
) => {
  try {
    const response = await axios.post(`${webhook}/crm.lead.add.json`, {
      fields,
    });

    return response.data;
  } catch (error) {
    await sendErrorCrmBot(
      `** ADD_BITRIX_LEAD_ERROR **
ERROR: ${error}
WEBHOOK: ${webhook}
FIELDS: ${JSON.stringify(fields)}`
    );
    throw error;
  }
};
