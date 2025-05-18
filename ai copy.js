const axios = require('axios');

const url = 'http://91.198.220.234:2025/chatv2';

async function sendRequests() {
  for (let i = 0; i < 25; i++) {
    try {
      const { data } = await axios.post(url, {
        k: 1,
        temperature: 0.1,
        max_tokens: 2,
        model: 'command-a-03-2025',
        messages: [
          {
            role: 'assistant',
            content:
              'Здравствуйте! Это кажется с вами, недавно мы сталкивались в Питере?',
          },
          {
            role: 'user',
            content: 'нет, не могли',
          },
          {
            role: 'assistant',
            content:
              'Отлично, тогда позвольте представить вам новый способ привлечения клиентов. Наша компания AISender поможет автоматизировать продажи, особенно в предпраздничные недели. Искусственный интеллект найдет клиентов и продаст ваши услуги, заменяя традиционную рекламу. Можете рассказать, вы раньше что-то встречали про SenderAI технологии?',
          },
          {
            role: 'user',
            content: 'отьебись, хотя не, расскажи',
          },
          {
            role: 'system',
            content: `
          You are the AISender AI Assistant. Your sole task is to read the user's last message and respond with ONLY a single digit from 0 to 10 representing their interest level. No other text, no JSON, just the digit.
          
          DEFINITIONS (choose the **one** best-fitting level):
          
          0. **Complete rejection**: Explicit blocking, reporting as spam, or complete dismissal → 0
          1. **Extreme hostility**: Violent threats, hate speech, aggressive language, or explicit calls for harm → 1  
          2. **Negative tone or aggression**: Insults, contempt, threats, harassment, or clear expressions of displeasure → 2  
          3. **Polite refusal**: Calm "no," "not now," "thank you, but no thanks," without any negative emotion → 3  
          4. **Explicit disinterest**: Refusal phrased with "not interested," "don't tell me," "I'm not interested" (containing negative wording but without hostility) → 4  
          5. **Neutral passivity**: Neither refusal nor agreement—minimal, factual or vague replies like "okay," "maybe," "got it" → 5  
          6. **Mild curiosity**: Asks simple clarifying or follow-up questions → 6  
          7. **Moderate interest**: Engages in features discussion, compares options → 7  
          8. **Strong interest**: Inquires about price, timeline, or implementation details → 8  
          9. **Very strong interest**: Expresses clear intent to proceed, "How do we get started?" → 9  
          10. **Ready to act**: Requests proposal, contract details, or says "Let's close the deal" → 10
          
          RULES:
          • **Any negative emotion or aggression** → level strictly 0–2, depending on severity.
          • **Any refusal without negative emotions** → minimum level 3. If negativity is present, always 0–2.  
          • **"Not interested" phrases** without explicit negativity → level 4.  
          • **Polite "no"** without negativity → level 3.  
          • **Neither refusal nor agreement** → level 5.  
          • Otherwise select 6–10 based on increasing level of engagement.  
          • **Output must be exactly one digit** (0-10) with no other text, no explanation, no JSON.`,
          },
        ],
      });
      const analysisResult = data.message.content; // Мы ожидаем, что модель вернет JSON с параметром interest_level
      console.log(`Response ${i + 1}:`, analysisResult);
    } catch (error) {
      console.error(`Error on request ${i + 1}:`, error);
    }
  }
}

sendRequests();
