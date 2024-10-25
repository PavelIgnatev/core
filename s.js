const { HttpsProxyAgent } = require('https-proxy-agent');

const sendToBot = async (text) => {
  const token = '6324276078:AAEGmvX4RI-qoJnKkNpBFhVYuYJTyHweCIo';
  const sendMessageUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const chatIds = ['483779758', '324820826', '6957002018'];
  const proxyUrl =
    'http://2NN9t04blzUA9505Py-dc-ANY:i2pkKrlPqQW92Zp@gw.thunderproxy.net:5959';

  const agent = new HttpsProxyAgent(proxyUrl);

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
          agent,
        });
      })
    );
  } catch (e) {
    console.log(e);
  }
};

sendToBot('qqq');
