import axios from 'axios';
import { ChatMessage } from 'cohere-ai/api';
import { blue, gray, red, yellow } from 'colors/safe';

import { sendToBot } from '../helpers/sendToBot';

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function countSentences(paragraph: string) {
  const sentenceEnders = ['.', '!', '?'];
  let sentenceCount = 0;

  for (let i = 0; i < paragraph.length; i++) {
    if (sentenceEnders.includes(paragraph[i])) {
      sentenceCount++;
    }
  }

  return sentenceCount;
}

function removeGreetings(text: string) {
  const greetings = [
    'Приветствую',
    'приветствую',
    'Привет',
    'привет',
    'Здравствуйте',
    'здравствуйте',
    'Здравствуй',
    'здравствуй',
    'Доброе утро',
    'доброе утро',
    'Добрый вечер',
    'добрый вечер',
    'Добрый день',
    'добрый день',
    'Доброго утра',
    'доброго утра',
    'Доброго вечера',
    'доброго вечера',
    'Доброго дня',
    'доброго дня',
    'Приветики',
    'приветики',
    'Доброго времени суток',
    'доброго времени суток',
    'Рад видеть',
    'рад видеть',
    'Рада видеть',
    'рада видеть',
    'С добрым утром',
    'с добрым утром',
    'С добрым днем',
    'с добрым днем',
    'С добрым вечером',
    'с добрым вечером',
    'С добрым утречком',
    'с добрым утречком',
    'Доброго',
    'доброго',
  ];

  greetings.forEach((greeting) => {
    text = text
      .replace(new RegExp(`${greeting},`, 'gi'), '')
      .replace(new RegExp(`${greeting}!`, 'gi'), '')
      .replace(new RegExp(`${greeting}\\s`, 'gi'), '')
      .replace(new RegExp(`${greeting}$`, 'gi'), '')
      .replace(new RegExp(`${greeting}`, 'gi'), '');
  });

  return text.trim();
}

export const makeRequestComplete = async (
  preamble: string,
  documents: { title: string; text: string }[],
  disableLink: boolean,
  deleteQuestion: boolean,
  minimalProposalLength: number,
  part: string | null,
  chatHistory: ChatMessage[],
  groupId: string,
  accountId: string
): Promise<string> => {
  console.log(
    `[${accountId}] Initialize sub module`,
    yellow('MAKE REQUEST COMPLETE')
  );

  const lastDialog = chatHistory.pop();
  console.log(
    `[${accountId}] Current preamble before generation:`,
    gray(preamble.replace(/\n/g, ''))
  );
  console.log(
    `[${accountId}] Current dialog history [${chatHistory.length}]:`,
    gray(JSON.stringify(chatHistory))
  );
  console.log(
    `[${accountId}] Last message from interlocutor:`,
    gray(String(lastDialog?.message).replace(/\n/g, ''))
  );
  console.log(`[${accountId}] Additional filters:`);
  console.log(
    `[${accountId}] Removing a reference:`,
    blue(disableLink ? 'on' : 'off')
  );
  console.log(
    `[${accountId}] Minimum number of messages in a reply:`,
    blue(String(minimalProposalLength))
  );
  console.log(`[${accountId}] Part check:`, part || 'off');

  let forceIncludePart = false;
  const generations = [];
  const errors = [];

  for (let i = 0; i < 5; i++) {
    try {
      if (!lastDialog) {
        throw new Error('Last dialog message not defined');
      }

      if (forceIncludePart && part) {
        preamble += `**!!REPLY WITH ${part}, MAKE IT APPROPRIATE!!**\n`;
      }

      const {
        data: { text: data },
      } = await axios.post('http://91.198.220.234/chat', {
        k: 30,
        temperature: 0.8,
        presence_penalty: 0.5,
        p: 0.9,
        model: 'command-r-plus',
        prompt_truncation: 'AUTO_PRESERVE_ORDER',
        preamble,
        documents,
        chat_history: chatHistory,
        message: lastDialog.message,
      });

      if (!data || !data.trim()) {
        throw new Error('Blank message');
      }

      let message = data
        .replace(/\n/g, '')
        .replace(/['"`]/g, '')
        .replace(/\*/g, '')
        .replace(/!/g, '.')
        .trim();

      generations.push(message);

      console.log(
        `[${accountId}] Generated message before filters:`,
        gray(message)
      );

      const pattern =
        /((http|https|www):\/\/.)?([a-zA-Z0-9'\/\.\-])+\.[a-zA-Z]{2,5}([a-zA-Z0-9\/\&\;\:\.\,\?\\=\-\_\+\%\'\~]*)/g;
      const hasTextLink = message.match(pattern);

      message = removeGreetings(message);
      if (hasTextLink && disableLink) {
        throw new Error(
          'The reply contains a link at a stage where it is forbidden to send links'
        );
      }

      if (
        message.includes('[') ||
        message.includes(']') ||
        message.includes('{') ||
        message.includes('}')
      ) {
        console.log(
          `\x1b[4mПотенциальное сообщение:\x1b[0m \x1b[36m${message}\x1b[0m`
        );
        throw new Error('The response contains suspicious characters');
      }

      const varMessage = capitalizeFirstLetter(message);

      if (deleteQuestion && varMessage.length < 60) {
        throw new Error('Minimum length 60 characters');
      }

      if (minimalProposalLength > countSentences(varMessage)) {
        throw new Error(`Minimal number of messages: ${minimalProposalLength}`);
      }

      if (part && !message.includes(part)) {
        forceIncludePart = true;
        throw new Error(
          `The potential message does not contain the ${part} part, although it should`
        );
      }

      const nmessage = varMessage.replace(/^[^a-zA-Zа-яА-Я]+/, '');
      console.log(
        `[${accountId}] Generated message after filters:`,
        gray(nmessage)
      );

      return nmessage;
    } catch (error: any) {
      await new Promise((res) => setTimeout(res, 2500));

      console.log(
        red(`[${accountId}] Request Complete Error: ${error.message}`)
      );
      errors.push(error.message);
    }
  }

  try {
    await sendToBot(`!!!GPT GENERATION ERROR!!!
GROUP ID: ${groupId}
ACCOUNT ID: ${accountId}
_____________
GENERATIONS:
${generations.map((g, i) => `${i + 1}: ${g}`).join('\n')}
ERRORS:
${errors.map((e, i) => `${i + 1}: ${e}`).join('\n')}
_____________
Удаление ссылки: ${disableLink ? 'включено' : 'выключено'}
Минимальное количество сообщений в ответе: ${minimalProposalLength}
Проверка на составную часть: ${part ? `включено (${part})` : 'выключено'}`);
  } catch (e: any) {
    console.log(red(`[${accountId}] GPT GENERATION ERROR: ${e.message}`));
  }

  if (generations[0]) {
    const nmessage = generations[0].replace(/^[^a-zA-Zа-яА-Я]+/, '');
    console.log(
      `[${accountId}] Generated message after filters:`,
      gray(nmessage)
    );

    return nmessage;
  }

  throw new Error('Stopped');
};
