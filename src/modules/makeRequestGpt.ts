import axios from 'axios';
import { blue, gray, red, yellow } from 'colors/safe';

import { sendToBot } from '../helpers/sendToBot';

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function hasMixedLanguageWords(str: string) {
  const mixedPattern = /[а-яА-Я][a-zA-Z]|[a-zA-Z][а-яА-Я]/;
  return mixedPattern.test(str);
}

function containsChinese(text: string) {
  const chineseRegex = /[\u4e00-\u9fa5]/;
  return chineseRegex.test(text);
}

export const makeRequestGpt = async (
  preamble: string,
  prompt: string,
  groupId: string,
  accountId: string,
  part: string | null = ''
): Promise<string> => {
  console.log(
    `[${accountId}] Initialize sub module`,
    yellow('MAKE REQUEST GPT')
  );

  console.log(
    `[${accountId}] Current preamble before generation:`,
    gray(preamble.replace(/\n/g, ''))
  );
  console.log(
    `[${accountId}] Current message for preamble:`,
    gray(String(prompt).replace(/\n/g, ''))
  );
  console.log(`[${accountId}] Additional filters:`);
  console.log(`[${accountId}] Part check:`, blue(part || 'off'));

  const generations = [];
  const errors = [];

  for (let i = 0; i < 5; i++) {
    try {
      const {
        data: { text: data },
      } = await axios.post('http://91.198.220.234/chat', {
        model: 'command-r-plus',
        k: 30,
        temperature: 0.8,
        presence_penalty: 0.5,
        p: 0.9,
        prompt_truncation: 'AUTO_PRESERVE_ORDER',
        preamble,
        message: prompt,
      });

      if (!data || !data.trim()) {
        throw new Error('Blank message');
      }
      generations.push(data);

      const message = data
        .replace(/\n/g, '')
        .replace(/['"`]/g, '')
        .replace(/!/g, '.')
        .trim();

      console.log(
        `[${accountId}] Generated message before filters:`,
        gray(message)
      );

      if (message.includes('[') || message.includes(']')) {
        throw new Error('The response contains suspicious characters');
      }

      if (hasMixedLanguageWords(message)) {
        throw new Error('The potential message contains English-Russian words');
      }

      if (containsChinese(message)) {
        throw new Error('The potential message contains Chinese words');
      }

      const varMessage = capitalizeFirstLetter(
        message
          .replace('Приветствую!', '')
          .replace('Приветствую,', '')
          .replace('Приветствую', '')
          .replace('приветствую', '')

          .replace('Привет,', '')
          .replace('Привет!', '')
          .replace('Привет', '')
          .replace('привет', '')

          .replace('Здравствуйте,', '')
          .replace('Здравствуйте!', '')
          .replace('Здравствуйте', '')
          .replace('здравствуйте', '')

          .replace('Здравствуй,', '')
          .replace('Здравствуй!', '')
          .replace('Здравствуй', '')
          .replace('здравствуй', '')

          .replace('Доброе утро,', '')
          .replace('Доброе утро!', '')
          .replace('Доброе утро', '')
          .replace('доброе утро', '')

          .replace('Добрый вечер,', '')
          .replace('Добрый вечер!', '')
          .replace('Добрый вечер', '')
          .replace('добрый вечер', '')

          .replace('Добрый день,', '')
          .replace('Добрый день!', '')
          .replace('Добрый день', '')
          .replace('добрый день', '')

          .replace('Hi,', '')
          .replace('Hi! ', '')
          .replace('Hi!', '')
          .replace('Hello,', '')
          .replace('Hello! ', '')
          .replace('Hello!', '')
          .replace('Good morning,', '')
          .replace('Good morning! ', '')
          .replace('Good morning!', '')
          .replace('Good morning', '')
          .replace('good morning', '')
          .replace('Good evening,', '')
          .replace('Good evening! ', '')
          .replace('Good evening!', '')
          .replace('Good evening', '')
          .replace('good evening', '')
          .replace('Good afternoon,', '')
          .replace('Good afternoon! ', '')
          .replace('Good afternoon!', '')
          .replace('Good afternoon', '')
          .replace('good afternoon', '')
      );

      if (part && !message.includes(part)) {
        throw new Error(
          `The potential message does not contain the ${part} part, although it should`
        );
      }

      return varMessage.replace(/^[^a-zA-Zа-яА-Я]+/, '');
    } catch (error: any) {
      await new Promise((res) => setTimeout(res, 2500));

      console.log(red(`[${accountId}] Request Gpt Error: ${error.message}`));
      errors.push(error.message);
    }
  }

  try {
    await sendToBot(`!!!GPT GENERATION ERROR (gpt)!!!
GROUP ID: ${groupId}
ACCOUNT ID: ${accountId}
_____________
GENERATIONS:
${generations.map((g, i) => `${i + 1}: ${g}`).join('\n')}
ERRORS:
${errors.map((e, i) => `${i + 1}: ${e}`).join('\n')}`);
  } catch (e: any) {
    console.log(red(`[${accountId}] GPT GENERATION ERROR: ${e.message}`));
  }

  if (generations[0]) {
    return generations[0].replace(/^[^a-zA-Zа-яА-Я]+/, '');
  }

  throw new Error('Stopped');
};
