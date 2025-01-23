import axios from 'axios';

import { generateRandomString } from './generateRandomString';
import { capitalizeFirstLetter, sleep } from './helpers';
import { sendToMainBot } from './sendToMainBot';
import { sendToNameBot } from './sendToNameBot';

const isRussian = (str: string) => /^[А-Яа-яЁё]+$/.test(str);

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('TIMEOUT_EXCEEDED')), ms)
  );
  return Promise.race([promise, timeout]);
};

const makeRequest = async (word: string) => {
  return await axios
    .get(`http://185.84.162.158:5000/search?name=${encodeURIComponent(word)}`)
    .then((response) => response.data)
    .catch(async (error) => {
      await sendToNameBot(`** NAME SERVER ERROR **
WORD: ${word}
ERROR: ${error.message}`);
      return null;
    });
};

const getUser = async (userContent: string, language: string) => {
  if (language !== 'RUSSIAN') {
    return null;
  }

  const content = userContent
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();

  const words = content.split(' ');
  const requests = words.map(w => w.trim()).filter(Boolean).map(makeRequest);

  let contentMap: Set<string> = new Set();
  try {
    const promises = await Promise.all(requests);
    for (const promise of promises) {
      const nameData = promise?.result?.first_name;

      if (
        nameData?.gender &&
        (nameData.gender.Female || nameData.gender.Male) &&
        Object.values(nameData.rank).filter((rank) => rank !== null).length > 3
      ) {
        contentMap.add(promise.name);
      }
    }
  } catch {}

  const contentRequets = [...contentMap].reduce(
    (a, b) => (a.length >= b.length ? a : b),
    ''
  );
  if (contentRequets.length < 2) {
    return null;
  }

  const processRequest = async () => {
    for (let i = 0; i < 5; i++) {
      try {
        const { data: resultData } = await axios.post(
          'http://91.198.220.234/chatv2',
          {
            temperature: 0.4,
            model: 'command-r-plus',
            safety_mode: 'NONE',
            messages: [
              {
                role: 'system',
                content: `Your task is to accurately identify and extract the real first name from the provided message and adjust it to its **${language}** version. The message may contain various elements such as usernames, display names, nicknames, titles, descriptors, and irrelevant words. Your primary goal is to extract the most likely real first name of the person and provide it in its **${language}** form, ensuring proper communication.

Please disregard usernames unless they are the only source of the name. If the display name is available and contains a plausible first name, prioritize it. Remove words like 'undefined', titles (e.g., 'Coach', 'Founder'), descriptors, emojis, and special characters. If multiple names are present, choose the first one that is likely the first name. Ignore additional information like surnames or middle names, as they are already removed automatically by the system.
                
**Important clarifications:**
1. If the name is a short form, do not attempt to convert it to a full form, even if the full form is commonly known. and "Alex" must remain "Alex"
2. If only a patronymic is present (e.g., 'Ivanovich', 'Vladimirovna'), **do not extract a first name from the patronymic**. If no first name is present alongside the patronymic, return "null."
3. If the input does not contain any recognizable short, full, or transliterated form of a real first name, you must return "null." Do not fabricate or infer a name in such cases.

Ensure the extracted name is adjusted to its **${language}** version, either by translation or transliteration, and maintain correct spelling and cultural appropriateness in **${language}**. If the name is already in **${language}**, leave it as is. Return only the name as plain text or "null" if no valid name is found. Do not provide any explanations or additional information.`,
              },
              {
                role: 'user',
                content: contentRequets,
              },
            ],
          }
        );

        const userInfo = resultData?.message?.content?.[0]?.text;
        if (userInfo === 'null') {
          return null;
        }

        if (language === 'RUSSIAN' && !isRussian(userInfo)) {
          throw new Error('INCORRECT_NAME');
        }

        const data = await makeRequest(userInfo);
        const { Female = 0, Male = 0 } = data?.result?.first_name?.gender || {};

        if (!Female && !Male) {
          throw new Error('INCORRECT_GENDER');
        }

        return {
          aiName: capitalizeFirstLetter(userInfo.toLowerCase()),
          aiGender: Female > Male ? 'female' : 'male',
        };
      } catch (error) {
        await sleep(1000);
      }
    }

    return null;
  };

  try {
    return await withTimeout(processRequest(), 300000);
  } catch {
    return null;
  }
};

export const getUserInformation = async (
  firstMessagePrompt: string,
  secondMessagePrompt: string,
  language: string,
  firstName: string,
  lastName: string,
  username: string
) => {
  let user = null;
  let firstMessage = generateRandomString(firstMessagePrompt);
  const secondMessage = generateRandomString(secondMessagePrompt);

  if (language === 'RUSSIAN') {
    const fm = firstMessage.replace(/[^а-яА-ЯёЁ]+/g, '');
    const userData = await getUser(
      `${firstName.toLowerCase()} ${lastName.toLowerCase()} ${username}`,
      language
    );

    if (userData?.aiName) {
      user = userData;
      firstMessage = `${fm}, ${userData.aiName}!`;
    } else {
      firstMessage = `${fm}!`;
    }
  }

  return { user, firstMessage, secondMessage };
};
