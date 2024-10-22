import axios from 'axios';
import { sendToBot } from '../helpers/sendToBot';
import { gray, red, yellow } from 'colors/safe';

const validateText = (
  companyData: string,
  inputString: string,
  language: 'ENGLISH' | 'RUSSIAN' | 'UKRAINIAN' | 'ANY'
) => {
  if (language === 'ANY') {
    return false;
  }

  const companyDataLowerCase = companyData.toLowerCase();
  const words = inputString.replace(/[.,!?;:'`"()«»…—\-/]/g, ' ').split(/\s+/);
  const russianUkrainianRegex = /^[а-яёіїєґ]+$/i;
  const englishRegex = /^[a-z]+$/i;

  const isProperNoun = (word: string) =>
    word[0] === word[0].toUpperCase() &&
    word.slice(1) === word.slice(1).toLowerCase();

  const cleanWord = (word: string) => word.trim();

  for (let word of words) {
    word = cleanWord(word);

    if (word.length === 0) continue;
    if (word === 'mainlink') continue;

    if (language === 'RUSSIAN' || language === 'UKRAINIAN') {
      if (!russianUkrainianRegex.test(word) && !isProperNoun(word)) {
        if (!companyDataLowerCase.includes(word.toLowerCase())) {
          return word.toLowerCase();
        }
      }
    } else if (language === 'ENGLISH') {
      if (!englishRegex.test(word) && !isProperNoun(word)) {
        if (!companyDataLowerCase.includes(word.toLowerCase())) {
          return word.toLowerCase();
        }
      }
    } else {
      return word.toLowerCase();
    }
  }

  return false;
};

function filterString(str: string, part: string | null, replaceValue: string) {
  if (!part) {
    return str;
  }

  const escapedPart = part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return str.replace(new RegExp(escapedPart, 'gi'), replaceValue);
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function addSpaceAfterPunctuation(str: string) {
  const urlRegex =
    /((http|https):\/\/)?(www\.)?([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\&\;\:\.\?\=\-\_\+\%\'\~\#]*)*/g;

  let match;
  let urls = [];
  while ((match = urlRegex.exec(str)) !== null) {
    urls.push({ start: match.index, end: match.index + match[0].length });
  }

  let result = "";

  for (let i = 0; i < str.length; i++) {
    const inUrl = urls.some((url) => i >= url.start && i < url.end);

    if (
      !inUrl &&
      /[,.?!;:]/.test(str[i]) &&
      i + 1 < str.length &&
      /\S/.test(str[i + 1])
    ) {
      result += str[i] + " ";
    } else {
      result += str[i];
    }
  }

  if (str !== result) {
    console.log(`
**ПРАВКИ ПУНКТУАЦИИ**
СООБЩЕНИЕ ДО: ${str}
СООБЩЕНИЕ ПОСЛЕ: ${result}`);
  }

  return result;
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
    'Приветствую всех участников',
    'Приветствую всех вас',
    'Приветствую всех',
    'Приветствую, коллеги',
    'Приветствую, друзья',
    'Рад приветствовать',
    'Рад всех видеть',
    'Рад видеть всех',
    'Рад вас видеть',
    'Рад видеть',
    'Рада видеть',
    'Привет-привет',
    'Доброго времени суток',
    'Доброго времени',
    'Добрейшего дня',
    'Приветствую',
    'Приветики',
    'Доброе утро',
    'Добрый вечер',
    'Добрый день',
    'Доброго утра',
    'Доброго вечера',
    'Доброго дня',
    'С добрым утречком',
    'С добрым утром',
    'С добрым днем',
    'С добрым вечером',
    'Добрый полдень',
    'Приветик',
    'Здравствуйте',
    'Здравствуй',
    'Привет',
    'Хэй',
    'Хай',
    'Доброго',
  ];

  const followUpWords = [
    'уважаемые коллеги',
    'дорогие друзья',
    'господа и дамы',
    'уважаемые партнеры',
    'коллеги мои',
    'друзья мои',
    'всех вас',
    'моих коллег',
    'наших гостей',
    'дорогие',
    'уважаемые',
    'господа',
    'товарищи',
    'коллеги',
    'друзья',
    'друг',
    'тебя',
    'вас',
    'вам',
    'тебе',
    'наши',
    'дня',
    'вечера',
    'утра',
    'времени',
    'суток',
    'благодарю',
  ];

  greetings.forEach((greeting) => {
    followUpWords.forEach((followUp) => {
      // Регулярное выражение, которое удаляет приветствие + обращение + возможный знак препинания
      const regex = new RegExp(`${greeting}\\s${followUp}[\\.,!]?`, 'gi');
      text = text.replace(regex, '');
    });

    // Также удаляем приветствия отдельно, если они без продолжений, плюс знак препинания
    const regexSingleGreeting = new RegExp(`${greeting}[\\.,!]?`, 'gi');
    text = text.replace(regexSingleGreeting, '');
  });

  return text.trim();
}

export async function makeRequestGpt(
  accountId: string,
  messages: {
    role: 'assistant' | 'system' | 'user';
    content: string;
  }[],
  part: string,
  language: 'ENGLISH' | 'RUSSIAN' | 'UKRAINIAN' | 'ANY',
  disableLink: boolean,
  mandatoryQuestion: boolean,
  minimalProposalLength: number,
  isRemoveGreetings: boolean,
  groupId: string | null
) {
  const generations = [];
  const errors = [];

  console.log(
    `[${accountId}] Initialize sub module`,
    yellow('MAKE REQUEST GPT')
  );
  console.log(
    `[${accountId}] Current preamble :`,
    gray(JSON.stringify(messages, null, 2))
  );

  for (let i = 0; i < 5; i++) {
    try {
      const { data: resultData } = await axios.post(
        'http://91.198.220.234/chatv2',
        {
          k: 30,
          temperature: 1,
          presence_penalty: 0.8,
          p: 0.95,
          model: 'command-r-plus-08-2024',
          messages,
        }
      );
      const data = resultData?.message?.content?.[0]?.text || '';

      if (!data.trim()) {
        throw new Error('Empty message');
      }

      let message = filterString(
        data.replace(/\n/g, '').replace(/\*/g, '').replace(/!/g, '.').trim(),
        part || '',
        'mainlink'
      );
      generations.push(message);

      const pattern =
        /((http|https):\/\/)?(www\.)?([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\&\;\:\.\,\?\=\-\_\+\%\'\~\#]*)*/g;
      const hasTextLink = message.match(pattern);

      message = isRemoveGreetings ? removeGreetings(message) : message;
      console.log(`[${accountId}] Var message: ${message}`);
      if (hasTextLink && disableLink) {
        throw new Error(
          'The reply contains a link at a stage where it is not allowed to send links'
        );
      }

      if (
        message.includes('[') ||
        message.includes(']') ||
        message.includes('{') ||
        message.includes('}')
      ) {
        throw new Error('The response contains suspicious [],{} characters');
      }

      const varMessage = capitalizeFirstLetter(
        addSpaceAfterPunctuation(message)
      );

      if (mandatoryQuestion && !varMessage.includes('?')) {
        throw new Error('Question was not generated');
      }
      if (mandatoryQuestion && varMessage.length < 200) {
        throw new Error('Minimum length 200 characters');
      }

      if (minimalProposalLength > countSentences(varMessage)) {
        throw new Error(
          `The minimum number of messages is ${minimalProposalLength}`
        );
      }

      if (part && !varMessage.includes('mainlink')) {
        throw new Error(
          `The response does not contain the "${part}", although it should`
        );
      }

      const text = validateText(JSON.stringify(messages), varMessage, language);
      if (text) {
        throw new Error(
          `There is a word ${text} that is not in the original context, it must be added there by all means`
        );
      }

      return filterString(
        varMessage.replace(/^[^a-zA-Zа-яА-Я]+/, ''),
        'mainlink',
        part || ''
      );
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
    return filterString(
      generations[0].replace(/^[^a-zA-Zа-яА-Я]+/, ''),
      'mainlink',
      part || ''
    );
  }

  throw new Error('Stopped');
}
