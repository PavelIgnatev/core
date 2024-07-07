import axios from "axios";

import { sendToBot } from "./sendToBot";

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
  accountId: string
): Promise<string> => {
  console.log(`Preamble: ${preamble}; Message: ${prompt}; `);

  const generations = [];
  const errors = [];

  for (let i = 0; i < 5; i++) {
    try {
      const {
        data: { text: data },
      } = await axios.post("http://91.198.220.234/chat", {
        model: "command-r-plus",
        k: 300,
        temperature: 1,
        prompt_truncation: "AUTO_PRESERVE_ORDER",
        preamble,
        message: prompt,
      });

      if (!data || !data.trim()) {
        throw new Error("Пустое сообщение");
      } 
      generations.push(data);

      let message = data
        .replace(/\n/g, "")
        .replace(/['"`]/g, "")
        .replace(/!/g, ".")
        .trim();

      if (
        message.includes("[") ||
        message.includes("]") ||
        message.includes("{") ||
        message.includes("}") ||
        message.includes("<") ||
        message.includes(">") ||
        message.includes("(") ||
        message.includes(")") ||
        message.includes("*")
      ) {
        console.log(
          `\x1b[4mПотенциальное сообщение:\x1b[0m \x1b[36m${message}\x1b[0m`
        );
        throw new Error("В ответе содержатся подозрительные символы");
      }

      if (hasMixedLanguageWords(message)) {
        console.log(
          `\x1b[4mПотенциальное сообщение:\x1b[0m \x1b[36m${message}\x1b[0m`
        );
        throw new Error(`Потенциальное сообщение содержит англо-русские слова`);
      }

      if (containsChinese(message)) {
        console.log(
          `\x1b[4mПотенциальное сообщение:\x1b[0m \x1b[36m${message}\x1b[0m`
        );
        throw new Error(`Потенциальное сообщение содержит китайские слова`);
      }

      const varMessage = capitalizeFirstLetter(
        message
          .replace("Приветствую!", "")
          .replace("Приветствую,", "")
          .replace("Приветствую", "")
          .replace("приветствую", "")

          .replace("Привет,", "")
          .replace("Привет!", "")
          .replace("Привет", "")
          .replace("привет", "")

          .replace("Здравствуйте,", "")
          .replace("Здравствуйте!", "")
          .replace("Здравствуйте", "")
          .replace("здравствуйте", "")

          .replace("Здравствуй,", "")
          .replace("Здравствуй!", "")
          .replace("Здравствуй", "")
          .replace("здравствуй", "")

          .replace("Доброе утро,", "")
          .replace("Доброе утро!", "")
          .replace("Доброе утро", "")
          .replace("доброе утро", "")

          .replace("Добрый вечер,", "")
          .replace("Добрый вечер!", "")
          .replace("Добрый вечер", "")
          .replace("добрый вечер", "")

          .replace("Добрый день,", "")
          .replace("Добрый день!", "")
          .replace("Добрый день", "")
          .replace("добрый день", "")

          .replace("Hi,", "")
          .replace("Hi! ", "")
          .replace("Hi!", "")
          .replace("Hello,", "")
          .replace("Hello! ", "")
          .replace("Hello!", "")
          .replace("Good morning,", "")
          .replace("Good morning! ", "")
          .replace("Good morning!", "")
          .replace("Good morning", "")
          .replace("good morning", "")
          .replace("Good evening,", "")
          .replace("Good evening! ", "")
          .replace("Good evening!", "")
          .replace("Good evening", "")
          .replace("good evening", "")
          .replace("Good afternoon,", "")
          .replace("Good afternoon! ", "")
          .replace("Good afternoon!", "")
          .replace("Good afternoon", "")
          .replace("good afternoon", "")
      );

      return varMessage.replace(/^[^a-zA-Zа-яА-Я]+/, "");
    } catch (error: any) {
      await new Promise((res) => setTimeout(res, 2500));

      console.log(`Ошибка запроса. ${error.message}`);
      errors.push(error.message);
    }
  }

  try {
    await sendToBot(`!!!GPT GENERATION ERROR (gpt)!!!
GROUP ID: ${groupId}
ACCOUNT ID: ${accountId}
_____________
GENERATIONS:
${generations.map((g, i) => `${i + 1}: ${g}`).join("\n")}
ERRORS:
${errors.map((e, i) => `${i + 1}: ${e}`).join("\n")}
`);
  } catch {}

  if (generations[0]) {
    return generations[0].replace(/^[^a-zA-Zа-яА-Я]+/, "");
  }

  throw new Error("Stopped");
};
