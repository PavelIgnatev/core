import axios from 'axios';

const sendToBotByChatIdText = async (chatId: string, text: string) => {
  const token = '7565638382:AAEnkq9g5ucdvTGVXy0NObOy5iYHt2KvzxA';
  const sendMessageUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const splitTextIntoChunks = (text: string, chunkSize = 4096) => {
    const chunks = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      chunks.push(text.slice(currentIndex, currentIndex + chunkSize));
      currentIndex += chunkSize;
    }
    return chunks;
  };

  const textChunks = splitTextIntoChunks(text);

  for (const chunk of textChunks) {
    await axios.post(sendMessageUrl, {
      chat_id: chatId,
      text: chunk,
      disable_web_page_preview: true,
    });
  }
};

export const sendToMainBot = async (text: string) => {
  const chatIds = ['483779758'];

  try {
    await Promise.all(
      chatIds.map(async (chatId) => {
        await sendToBotByChatIdText(chatId, text);
      })
    );
  } catch {}
};
