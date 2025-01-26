import axios from 'axios';
import emojiRegex from 'emoji-regex';

import { sleep } from './helpers';
import { sendToMainBot } from './sendToMainBot';

function trimmer(str: string) {
  if (
    str.endsWith('.') ||
    str.endsWith(',') ||
    str.endsWith('!') ||
    str.endsWith('?')
  ) {
    return str.slice(0, -1);
  }
  return str;
}

function hasConsecutiveQuestionSentences(text: string): boolean {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  let previousWasQuestion = false;
  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (trimmedSentence.endsWith('?')) {
      if (previousWasQuestion) {
        return true;
      }
      previousWasQuestion = true;
    } else {
      previousWasQuestion = false;
    }
  }
  return false;
}

function containsIdeographicOrArabic(str: string) {
  const ideographicAndArabicRegex =
    /[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return ideographicAndArabicRegex.test(str);
}

const validateText = (
  companyData: string,
  inputString: string,
  language: 'ENGLISH' | 'RUSSIAN' | 'UKRAINIAN' | 'ANY'
) => {
  if (language === 'ANY') {
    return false;
  }

  const companyDataLowerCase = companyData.toLowerCase();
  const words = inputString.replace(/[.,!?;:'`"()@«»…—\-/]/g, ' ').split(/\s+/);
  const russianUkrainianRegex = /^[а-яёіїєґ]+$/i;
  const englishRegex = /^[a-z]+$/i;

  const pattern =
    /((http|https):\/\/)?(www\.)?([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\&\;\:\.\,\?\=\-\_\+\%\'\~\#]*)*/g;
  const links = inputString.match(pattern);
  if (links) {
    for (const link of links) {
      if (!companyDataLowerCase.includes(trimmer(link.trim().toLowerCase()))) {
        return link.toLocaleLowerCase();
      }
    }
  }

  const isProperNoun = (word: string) => word[0] === word[0].toUpperCase();
  const cleanWord = (word: string) => trimmer(word.trim());

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

  let result = '';

  for (let i = 0; i < str.length; i++) {
    const inUrl = urls.some((url) => i >= url.start && i < url.end);

    if (
      !inUrl &&
      /[,.?!;:]/.test(str[i]) &&
      i + 1 < str.length &&
      /\S/.test(str[i + 1])
    ) {
      result += str[i] + ' ';
    } else {
      result += str[i];
    }
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
    'Доброе время суток',
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
  groupId: string,
  aiParams: Record<string, any>
) {
  const generations = [];
  const errors: string[] = [];

  console.log({
    accountId,
    message: `[AI_REQUEST]`,
    payload: {
      groupId,
      part,
      language,
      disableLink,
      mandatoryQuestion,
      minimalProposalLength,
      isRemoveGreetings,
      aiParams,
      messages,
    },
  });

  let i = 0;
  while (i !== 5) {
    try {
      const fixedMessages = messages.map((message) => {
        if (message.role !== 'system' || errors.length === 0) return message;

        return {
          ...message,
          content: `${message.content}
## MANDATORY REQUIREMENTS FOR REPLY
${errors.map((error) => `- **${error}**`).join('\n')}`,
        };
      });

      const { data: resultData } = await axios.post(
        'http://91.198.220.234/chatv2',
        {
          ...aiParams,
          model: 'command-r-plus-08-2024',
          messages: fixedMessages,
        }
      );
      const data = resultData?.message?.content?.[0]?.text || '';

      if (!data.trim()) {
        throw new Error('Empty message');
      }

      let message = filterString(
        data
          .replace(/\n/g, '')
          .replace(/\*/g, '')
          .replace(/!/g, '.')
          .replace(emojiRegex(), '')
          .replace('<ASSISTANT>:', '')
          .replace('<ASSISTANT>', '')
          .replaceAll(/[«»„“”‘’'"`『』「」]/g, '')
          .replace('т.me', 't.me')
          .replace('т .me', 't.me')
          .replace('т. me', 't.me')
          .trim(),
        (part || '').trim(),
        'mainlink'
      );

      const pattern =
        /((http|https):\/\/)?(www\.)?([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\&\;\:\.\,\?\=\-\_\+\%\'\~\#]*)*/g;
      const hasTextLink = message.match(pattern);

      message = isRemoveGreetings ? removeGreetings(message) : message;

      if (
        message.includes('[') ||
        message.includes(']') ||
        message.includes('{') ||
        message.includes('}') ||
        message.includes('<') ||
        message.includes('>') ||
        message.includes('section') ||
        message.includes('sign')
      ) {
        throw new Error(
          'The response should not contain suspicious characters [],{},<>, the word "section" or "sign"'
        );
      }

      if (containsIdeographicOrArabic(message)) {
        throw new Error(
          'The answer must not contain Arabic characters or any hieroglyphics'
        );
      }

      const text = validateText(JSON.stringify(messages), message, language);
      if (text) {
        throw new Error(
          `The word ${text} is not allowed in reply, its use is prohibited`
        );
      }

      generations.push(message);

      if (hasTextLink && disableLink) {
        throw new Error(
          'The reply should not contain any references at this stage'
        );
      }

      if (mandatoryQuestion && hasConsecutiveQuestionSentences(message)) {
        throw new Error(
          'An answer should contain no more than one question. The use of multiple or consecutive questions in a single answer is strictly prohibited.'
        );
      }

      const varMessage = capitalizeFirstLetter(
        addSpaceAfterPunctuation(message)
      );

      if (mandatoryQuestion && !varMessage.includes('?')) {
        throw new Error(
          'The question in the reply is mandatory. Add a question at the end of the line.'
        );
      }

      if (mandatoryQuestion && varMessage.length < 200) {
        throw new Error(
          'Minimum reply length 200 characters. Make a reply of at least 3 sentences.'
        );
      }

      if (minimalProposalLength > countSentences(varMessage)) {
        throw new Error(
          `The minimum number of sentences is ${minimalProposalLength}`
        );
      }

      if (part && !varMessage.includes('mainlink')) {
        throw new Error(
          `The response does not contain the unique “${part}” part, even though it should contain`
        );
      }

      console.log({
        accountId,
        message: `[AI_RESPONSE]`,
        payload: { message },
      });

      return filterString(
        varMessage.replace(/^[^a-zA-Zа-яА-Я]+/, ''),
        'mainlink',
        (part || '').trim()
      );
    } catch (error: any) {
      await sleep(2500);

      if (
        error.message !==
          'The answer must not contain Arabic characters or any hieroglyphics' &&
        error.message !==
          'The response should not contain suspicious characters [],{},<>, the word "section" or "sign"' &&
        !error.message.includes('is not allowed in reply')
      ) {
        i += 1;
      }

      errors.push(error.message);
    }
  }

  await sendToMainBot(`** GENERATION_ERROR **
GROUP ID: ${groupId}
ACCOUNT ID: ${accountId}
_____________
GENERATIONS:
${generations.map((g, i) => `${i + 1}: ${g}`).join('\n')}
ERRORS:
${errors.map((e, i) => `${i + 1}: ${e}`).join('\n')}`);

  if (generations[0]) {
    console.log({
      accountId,
      message: `[AI_RESPONSE]`,
      variantMessage: generations[0],
    });

    return filterString(
      generations[0].replace(/^[^a-zA-Zа-яА-Я]+/, ''),
      'mainlink',
      (part || '').trim()
    );
  }

  throw new Error('STOPPED_ERROR');
}
