const sendToBotByChatIdText = async (chatId: string, text: string) => {
  const token = '8313888175:AAF-0t25OPYn6yYGOM6VM9hsXGQWyBWyCos';
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
    await fetch(sendMessageUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: chunk,
        disable_web_page_preview: true,
      }),
    });
  }
};

export const sendToGoogleCrmBot = async (text: string) => {
  const chatIds = ['483779758', '7938128354'];

  try {
    await Promise.all(
      chatIds.map(async (chatId) => {
        await sendToBotByChatIdText(chatId, text);
      })
    );
  } catch {}
};
