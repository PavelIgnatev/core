import axios from 'axios';

import { sendErrorCrmBot } from '../helpers/sendErrorCrmBot';

interface ApiLeadData {
  status: 'lead' | 'continue' | 'negative';
  reason: string;
  aiBotName: string;
  aiBotUsername: string;

  groupId: string;
  leadId: string;
  leadTitle: string;
  leadUsername: string;
  leadPhone: string;
  leadBio: string;

  messages: Array<{
    text: string;
    from: 'ai' | 'lead';
    date: number;
  }>;

  dateCreated: string;
  dateUpdated: string;
}

export const sendToApi = async (webhook: string, data: ApiLeadData) => {
  try {
    const response = await axios.post(webhook, data);
    return response.data;
  } catch (error) {
    await sendErrorCrmBot(
      `** API_URL_SENDER_ERROR **
ERROR: ${error}
WEBHOOK: ${webhook}
DATA: ${JSON.stringify(data)}`
    );
    throw error;
  }
};
