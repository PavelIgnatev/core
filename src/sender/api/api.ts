import axios from 'axios';

import { sendToMainBot } from '../helpers/sendToMainBot';

interface ApiLeadData {
  status: 'lead' | 'continue' | 'negative';
  reason: string;

  leadId: string;
  leadTitle: string;
  leadUsername?: string | null;
  leadPhone?: string | null;
  leadBio?: string | null;
  messages: Array<{
    text: string;
    from: 'ai' | 'lead';
    date: number;
  }>;
}

export const sendToApi = async (webhook: string, data: ApiLeadData) => {
  try {
    const response = await axios.post(webhook, data);
    return response.data;
  } catch (error) {
    await sendToMainBot(
      `** API_URL_SENDER_ERROR **
ERROR: ${error}
WEBHOOK: ${webhook}
DATA: ${JSON.stringify(data)}`
    );
    throw error;
  }
};
