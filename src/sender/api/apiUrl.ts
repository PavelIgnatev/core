import axios from 'axios';

import { sendToMainBot } from '../helpers/sendToMainBot';

interface ApiUrlLeadData {
  status: 'interesting' | 'normal' | 'stop';
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

export const sendToApiUrl = async (apiUrl: string, data: ApiUrlLeadData) => {
  try {
    const response = await axios.post(apiUrl, data);
    return response.data;
  } catch (error) {
    await sendToMainBot(
      `** API_URL_SENDER_ERROR **
ERROR: ${error}
API_URL: ${apiUrl}
DATA: ${JSON.stringify(data)}`
    );
    throw error;
  }
};
