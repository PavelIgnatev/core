import { generateRandomString } from './generateRandomString';

export const getSenderInformation = async (
  firstMessagePrompt: string,
  secondMessagePrompt: string,
  language: string,
) => {
  let user = null;
  let firstMessage = generateRandomString(firstMessagePrompt);
  const secondMessage = generateRandomString(secondMessagePrompt);

  if (language === 'RUSSIAN') {
    const fm = firstMessage.replace(/[^а-яА-ЯёЁ]+/g, '');
    firstMessage = `${fm}!`;
  }

  return { user, firstMessage, secondMessage };
};
