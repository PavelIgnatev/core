import axios from 'axios';

import { sendErrorCrmBot } from '../helpers/sendErrorCrmBot';

interface AmoLeadBody {
  TITLE_RECIPIENT: string;
  TITLE_USERNAME: string;
  TITLE_PHONE: string;
  TITLE_FALLBACK: string;
  
  DESC_PHONE: string;
  DESC_USERNAME: string;
  DESC_BIO: string;
  DESC_COMMENT: string;

  COMMENTS_GROUP_ID: string;
  COMMENTS_RECIPIENT_ID: string;
  COMMENTS_DIALOGUE: string;
  COMMENTS_AI_BOT_NAME: string;
  COMMENTS_AI_BOT_USERNAME: string;

  DATE_CREATE: string;
  DATE_MODIFY: string;
}

interface AmoResponse {
  result?: number;
  error?: string;
}

export const addAmoLead = async (
  webhook: string,
  body: AmoLeadBody
): Promise<AmoResponse> => {
  try {
    const response = await axios.post(webhook, body);
    return response.data;
  } catch (error) {
    await sendErrorCrmBot(
      `** ADD_AMO_LEAD_ERROR **
ERROR: ${error}
WEBHOOK: ${webhook}
BODY: ${JSON.stringify(body)}`
    );
    throw error;
  }
};
