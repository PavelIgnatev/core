import axios from 'axios';

import { sendToMainBot } from './sendToMainBot';

export const fetchTelegramChatLink = async (): Promise<string | null> => {
  try {
    const response = await axios.get('http://185.84.162.158:8090/chat', {
      timeout: 5000,
      headers: {
        Accept: 'text/plain',
        'User-Agent': 'Telegram-Parser/1.0',
      },
    });

    if (!response.data) {
      return null;
    }

    if (typeof response.data !== 'string') {
      await sendToMainBot(`** TELEGRAM_LINK_FETCHER_TYPEOF_ERROR **
${response.data}`);
      return null;
    }

    const data = response.data.trim();
    if (/^https:\/\/t\.me\/[a-zA-Z0-9_]+$/.test(data)) {
      return data;
    }

    await sendToMainBot(`** TELEGRAM_LINK_FETCHER_REGEX_ERROR **
${data}`);

    return null;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      await sendToMainBot(`** TELEGRAM_LINK_FETCHER_AXIOS_ERROR **    
${error.message}`);
    } else {
      await sendToMainBot(`** TELEGRAM_LINK_FETCHER_ERROR **
${error.message}`);
    }

    return null;
  }
};
