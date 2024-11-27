import axios from 'axios';
import { sendToNameBot } from './sendToNameBot';

const language = 'RUSSIAN';

const isCyrillic = (str: string) => {
  return /^[А-Яа-яЁё]+$/.test(str);
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getUserInformation = async (content: string) => {
  for (let i = 0; i < 5; i++) {
    try {
      const { data: resultData } = await axios.post(
        'http://91.198.220.234/chatv2',
        {
          temperature: 0.2,
          model: 'command-r-plus-08-2024',
          safety_mode: 'NONE',
          messages: [
            {
              role: 'system',
              content: `Your task is to accurately identify and extract the real first name from the provided message and adjust it to its **${language}** version. The message may contain various elements such as usernames, full names, nicknames, titles, descriptors, and irrelevant words. Your primary goal is to extract the most likely real first name of the person and provide it in its **${language}** form, ensuring proper communication.
    
Please disregard usernames unless they are the only source of the name. If the display name is available and contains a plausible first name, prioritize it. Remove words like 'undefined', titles (e.g., 'Coach', 'Founder'), descriptors, emojis, and special characters. If multiple names are present, choose the first one that is likely the first name, and ignore surnames, middle names, and any additional information after the first name.
    
**Important clarifications:**
1. If the input contains a phrase, username, or string that does not clearly represent a real and valid first name, you must return null for both name and gender.
2. If the name is a short form (e.g., Vlad), do not attempt to convert it to a full form (e.g., Vladimir, Vladislav), unless the full form is explicitly stated and unambiguous. 

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
      if (!userInfo.name || !userInfo.gender) {
        await sendToNameBot(`DATA: ${content}
RESULT: ${JSON.stringify({ name: null, gender: null })}`);

        return { name: null, gender: null };
      }

      if (!isCyrillic(userInfo.name)) {
        throw new Error('Incorrect name');
      }

      await sendToNameBot(`DATA: ${content}
RESULT: ${JSON.stringify(userInfo)}`);

      return {
        name: capitalizeFirstLetter(userInfo.name),
        gender: userInfo.gender,
      };
    } catch (error) {
      await new Promise((res) => setTimeout(res, 1000));
    }
  }
  await sendToNameBot(`DATA: ${content}
RESULT: ${JSON.stringify({ name: null, gender: null })}`);

  return { name: null, gender: null };
};
