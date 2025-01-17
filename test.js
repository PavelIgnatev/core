const axios = require('axios');

const url = 'http://localhost/chatv2';

async function sendRequests() {
  for (let i = 0; i < 25; i++) {
    try {
      const { data } = await axios.post(url, {
        temperature: 1,
        presence_penalty: 0.5,
        model: 'command-r-plus',
        messages: [
          { role: 'system', content: 'ты - бот' },
          {
            role: 'assistant',
            content: 'привет',
          },
          { role: 'user', content: 'привет как тебя зовут?' },
        ],
      });
      // Обработка ответа ассистента
      console.log(`Response ${i + 1}:`, data.message.content);
    } catch (error) {
      console.error(`Error on request ${i + 1}:`, error);
    }
  }
}

sendRequests();
