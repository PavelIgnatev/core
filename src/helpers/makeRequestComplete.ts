import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

import { ChatMessage } from "cohere-ai/api";
import { sendToBot } from "./sendToBot";

const httpsAgent = new HttpsProxyAgent(
  "http://gsDIvA0qq3ZaPm67Hm-dc-ANY:FMOC7cexv7V33La@gw.thunderproxies.net:5959"
);
const paxios = axios.create({ httpsAgent });

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeQuestionAndExclamationSentences(text: string) {
  const pattern = /[^.!?]*(?:[!?])/g;
  const result = text.replace(pattern, "");
  return result.trim();
}

function hasMixedLanguageWords(str: string) {
  const mixedPattern = /[а-яА-Я][a-zA-Z]|[a-zA-Z][а-яА-Я]/;
  return mixedPattern.test(str);
}

function containsChinese(text: string) {
  const chineseRegex = /[\u4e00-\u9fa5]/;
  return chineseRegex.test(text);
}

function countSentences(paragraph: string) {
  const sentenceEnders = [".", "!", "?"];
  let sentenceCount = 0;

  for (let i = 0; i < paragraph.length; i++) {
    if (sentenceEnders.includes(paragraph[i])) {
      sentenceCount++;
    }
  }

  return sentenceCount;
}

export const makeRequestComplete = async (
  preamble: string,
  disableLink: boolean = false,
  deleteQuestion: boolean = false,
  minimalProposalLength: number = 1,
  part: string | null = null,
  chatHistory: ChatMessage[],
  groupId: string,
  accountId: string
): Promise<string> => {
  const lastDialog = chatHistory.pop();

  console.log(
    `Текущий промпт перед генерацией: ${preamble}; Текущая история диалога: ${JSON.stringify(
      chatHistory
    )}; Последнее сообщение от собеседника: ${lastDialog?.message}`
  );

  console.log("Дополнительные фильтры:");
  console.log(`Удаление ссылки: ${disableLink ? "включено" : "выключено"}`);
  console.log(`Удаление вопроса: ${deleteQuestion ? "включено" : "выключено"}`);
  console.log(
    `Минимальное количество сообщений в ответе: ${minimalProposalLength}`
  );
  console.log(
    `Проверка на составную часть: ${part ? `включено (${part})` : "выключено"}`
  );
  const generations = [];
  const errors = [];

  for (let i = 0; i < 5; i++) {
    try {
      if (!lastDialog) {
        throw new Error("Last Message not defined");
      }

      const {
        data: { text: data },
      } = await paxios.post(
        "https://api.cohere.com/chat",
        {
          model: "command-r",
          k: 300,
          temperature: 1,
          promptTruncation: "OFF",
          preamble,
          chatHistory,
          message: lastDialog.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer hJIpmKJXnn6XqAF9v2izCkQR1sw3fEPth3CVFBkv",
          },
        }
      );

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

      if (hasTextLink && disableLink) {
        console.log(
          `\x1b[4mПотенциальное сообщение:\x1b[0m \x1b[36m${message}\x1b[0m`
        );
        throw new Error(
          "В ответе содержится ссылка на этапе, когда ссылки отправлять запрещено"
        );
      }

      if (part) {
        message = message
          .replace(part, "[LINKTOGOAL]")
          .replace(part, "[LINKTOGOAL]")
          .replace(part, "[LINKTOGOAL]");
      }

      if (deleteQuestion && message.includes("?")) {
        console.log(`part: ${part}`);
        console.log(
          `\x1b[4mПотенциальное сообщение до удаления вопроса:\x1b[0m \x1b[36m${message}\x1b[0m`
        );
        message = removeQuestionAndExclamationSentences(message);
        console.log(
          `\x1b[4mПотенциальное сообщение после удаления вопроса:\x1b[0m \x1b[36m${message}\x1b[0m`
        );
      }

      if (part) {
        message = message
          .replace("[LINKTOGOAL]", part)
          .replace("[LINKTOGOAL]", part)
          .replace("[LINKTOGOAL]", part);
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

      const varMessage = capitalizeFirstLetter(message);

      if (varMessage.length < 60) {
        throw new Error("Минимальная длина 60 символов");
      }

      if (minimalProposalLength > countSentences(varMessage)) {
        console.log(
          `\x1b[4mПотенциальное сообщение:\x1b[0m \x1b[36m${message}\x1b[0m`
        );
        throw new Error(
          `Минимальное количество сообщений - ${minimalProposalLength}`
        );
      }

      if (part && !message.includes(part)) {
        console.log(
          `\x1b[4mПотенциальное сообщение:\x1b[0m \x1b[36m${message}\x1b[0m`
        );
        throw new Error(
          `Потенциальное сообщение не содержит часть ${part}, хотя должно`
        );
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

      return varMessage;
    } catch (error: any) {
      console.log(`Ошибка запроса. ${error.message}`);
      errors.push(error.message);
    }
  }

  await sendToBot(`!!!GPT GENERATION ERROR!!!
GROUP ID: ${groupId}
ACCOUNT ID: ${accountId}
_____________
GENERATIONS:
${generations.map((g, i) => `${i + 1}: ${g}`).join("\n")}
ERRORS:
${errors.map((e, i) => `${i + 1}: ${e}`).join("\n")}
_____________
Удаление ссылки: ${disableLink ? "включено" : "выключено"}
Удаление вопроса: ${deleteQuestion ? "включено" : "выключено"}
Минимальное количество сообщений в ответе: ${minimalProposalLength}
Проверка на составную часть: ${part ? `включено (${part})` : "выключено"}`);

  if (generations[0]) {
    return generations[0];
  }

  throw new Error("Stopped");
};
