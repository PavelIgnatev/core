import axios from "axios";

import { sendToBot } from "./sendToBot";

function hasMixedLanguageWords(str: string) {
  const mixedPattern = /[а-яА-Я][a-zA-Z]|[a-zA-Z][а-яА-Я]/;
  return mixedPattern.test(str);
}

function containsChinese(text: string) {
  const chineseRegex = /[\u4e00-\u9fa5]/;
  return chineseRegex.test(text);
}

export const makeRequestGpt = async (
  prompt: string,
  groupId: string,
  accountId: string
): Promise<string> => {
  console.log(
    `Текущий message перед генерацией: ${prompt}; Текущая история диалога`
  );

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
        promptTruncation: "OFF",
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

      let pattern =
        /((http|https|www):\/\/.)?([a-zA-Z0-9'\/\.\-])+\.[a-zA-Z]{2,5}([a-zA-Z0-9\/\&\;\:\.\,\?\\=\-\_\+\%\'\~]*)/g;
      const hasTextLink = message.match(pattern);

      if (hasTextLink) {
        console.log(
          `\x1b[4mПотенциальное сообщение:\x1b[0m \x1b[36m${message}\x1b[0m`
        );
        throw new Error(
          "В ответе содержится ссылка на этапе, когда ссылки отправлять запрещено"
        );
      }

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

      return message;
    } catch (error: any) {
      await new Promise((res) => setTimeout(res, 2500));

      console.log(`Ошибка запроса. ${error.message}`);
      errors.push(error.message);
    }
  }

  await sendToBot(`!!!GPT GENERATION ERROR (gpt)!!!
GROUP ID: ${groupId}
ACCOUNT ID: ${accountId}
_____________
GENERATIONS:
${generations.map((g, i) => `${i + 1}: ${g}`).join("\n")}
ERRORS:
${errors.map((e, i) => `${i + 1}: ${e}`).join("\n")}
`);

  if (generations[0]) {
    return generations[0];
  }

  throw new Error("Stopped");
};
