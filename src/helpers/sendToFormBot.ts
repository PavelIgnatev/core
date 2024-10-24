export const sendToFormBot = async (text: string) => {
  const token = '7340207766:AAGA80GwPsYYdOfd28_yCSDAwiBAg6XrAcM';
  const sendMessageUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const chatIds = ['483779758', '324820826', '6957002018'];

  try {
    await Promise.all(
      chatIds.map(async (chatId) => {
        await fetch(sendMessageUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text,
          }),
        });
      })
    );
  } catch (e) {
    console.log(e);
  }
};
