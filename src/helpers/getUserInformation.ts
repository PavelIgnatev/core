import axios from 'axios';
import { sendToNameBot } from './sendToNameBot';
import { sendToBot } from './sendToBot';

const isRussian = (str: string) => {
  return /^[А-Яа-яЁё]+$/.test(str);
};

const isEnglish = (str: string) => {
  return /^[A-Za-z]+$/.test(str);
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const withTimeout = (promise: Promise<any>, ms: number) => {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout exceeded')), ms)
  );
  return Promise.race([promise, timeout]);
};

export const getUserInformation = async (
  userContent: string,
  language: string
) => {
  if (language !== 'RUSSIAN' && language !== 'ENGLISH') {
    return { aiName: null, aiGender: null };
  }

  const content = userContent
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();

  if (!content) {
    return { aiName: null, aiGender: null };
  }

  const processRequest = async () => {
    for (let i = 0; i < 5; i++) {
      try {
        const { data: resultData } = await axios.post(
          'http://91.198.220.234/chatv2',
          {
            temperature: 0.2,
            model: 'command-r-plus',
            safety_mode: 'NONE',
            messages: [
              {
                role: 'system',
                content: `Your task is to accurately identify and extract the real first name from the provided message and adjust it to its **${language}** version. The message may contain various elements such as usernames, full names, nicknames, titles, descriptors, and irrelevant words. Your primary goal is to extract the most likely real first name of the person and provide it in its **${language}** form, ensuring proper communication.
    
Please disregard usernames unless they are the only source of the name. If the display name is available and contains a plausible first name, prioritize it. Remove words like 'undefined', titles (e.g., 'Coach', 'Founder'), descriptors, emojis, and special characters. If multiple names are present, choose the first one that is likely the first name, and ignore surnames, middle names, and any additional information after the first name.
    
**Important clarifications:**
1. If the name is a short form, do not attempt to convert it to a full form, unless the full form is explicitly stated and unambiguous. Just use the short form for this case.
2. If only a patronymic is present (e.g., 'Ivanovich', 'Vladimirovna'), **do not extract a first name from the patronymic**. If no first name is present alongside the patronymic, return null.
3. If the input does not contain any recognizable short, full, or transliterated form of a real first name, you must return null for both name and gender. Do not fabricate or infer a name in such cases.

Ensure the extracted name is adjusted to its **${language}** version, either by translation or transliteration, and maintain correct spelling and cultural appropriateness in **${language}**. If the name is already in **${language}**, leave it as is.`,
              },
              {
                role: 'user',
                content,
              },
            ],
            response_format: {
              type: 'json_object',
              schema: {
                type: 'object',
                properties: {
                  name: { type: ['string', 'null'] },
                  gender: {
                    type: ['string', 'null'],
                    enum: ['male', 'female', null],
                  },
                },
                required: ['name', 'gender'],
              },
            },
          }
        );

        const userInfo = JSON.parse(resultData?.message?.content?.[0]?.text);
        if (!userInfo.name && !userInfo.gender) {
          return { aiName: null, aiGender: null };
        }

        if (!userInfo.name || !userInfo.gender) {
          throw new Error('Name or Gender not defined');
        }

        if (
          (language === 'RUSSIAN' && !isRussian(userInfo.name)) ||
          (language === 'ENGLISH' && !isEnglish(userInfo.name))
        ) {
          throw new Error('Incorrect name');
        }

        await sendToNameBot(`DATA: ${content} (${i + 1} times)
RESULT: ${JSON.stringify(userInfo)}`);

        return {
          aiName: capitalizeFirstLetter(userInfo.name.toLowerCase()),
          aiGender: userInfo.gender,
        };
      } catch (error) {
        await new Promise((res) => setTimeout(res, 1000));
      }
    }

    await sendToNameBot(`DATA: ${content} (limit times)
RESULT: ${JSON.stringify({ name: null, gender: null })}`);

    return { aiName: null, aiGender: null };
  };

  try {
    return await withTimeout(processRequest(), 180000);
  } catch {
    await sendToNameBot(`DATA: ${content} (ERROR)
RESULT: ${JSON.stringify({ name: null, gender: null })}`);

    return { aiName: null, aiGender: null };
  }
};
