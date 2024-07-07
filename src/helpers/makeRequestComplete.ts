import axios from "axios";
import { ChatMessage } from "cohere-ai/api";

import { sendToBot } from "./sendToBot";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeQuestionAndExclamationSentences(text: string) {
  const pattern = /[^.!?]*(?:[!?])/g;
  const result = text.replace(pattern, "");
  return result.trim();
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
  documents: { title: string; text: string }[],
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
      } = await axios.post("http://91.198.220.234/chat", {
        k: 0,
        p: 0.99,
        presence_penalty: 1,
        temperature: 1,
        model: "command-r-plus",
        prompt_truncation: "AUTO_PRESERVE_ORDER",
        preamble,
        documents,
        chat_history: chatHistory,
        message: lastDialog.message,
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

      return varMessage.replace(/^[^a-zA-Zа-яА-Я]+/, "");
    } catch (error: any) {
      await new Promise((res) => setTimeout(res, 2500));

      console.log(`Ошибка запроса. ${error.message}`);
      errors.push(error.message);
    }
  }

  try {
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
  } catch {}

  if (generations[0]) {
    return generations[0].replace(/^[^a-zA-Zа-яА-Я]+/, "");
  }

  throw new Error("Stopped");
};
