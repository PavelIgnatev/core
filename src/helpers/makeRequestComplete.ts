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
  prompt: string,
  disableLink: boolean = false,
  deleteQuestion: boolean = false,
  minimalProposalLength: number = 1,
  part: string | null = null
): Promise<string> => {
  console.log(`Текущий промпт перед генерацией: ${prompt}`);
  console.log("Дополнительные фильтры:");
  console.log(`Удаление ссылки: ${disableLink ? "включено" : "выключено"}`);
  console.log(`Удаление вопроса: ${deleteQuestion ? "включено" : "выключено"}`);
  console.log(
    `Минимальное количество сообщений в ответе: ${minimalProposalLength}`
  );
  console.log(
    `Проверка на составную часть: ${part ? `включено (${part})` : "выключено"}`
  );

  while (true) {
    try {
      const response = await fetch("http://81.31.245.212/complete/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.text();

      if (!data.trim()) {
        throw new Error("Пустое сообщение");
      }

      let message = data.replace(/\n/g, "").replace(/['"`]/g, "").trim();

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

      if (deleteQuestion && (message.includes("?") || message.includes("!"))) {
        console.log(`part: ${part}`);
        console.log(
          `\x1b[4mПотенциальное сообщение до удаления вопроса или восклицательного предложения:\x1b[0m \x1b[36m${message}\x1b[0m`
        );
        message = removeQuestionAndExclamationSentences(message);
        console.log(
          `\x1b[4mПотенциальное сообщение после удаления вопроса или восклицательного предложения:\x1b[0m \x1b[36m${message}\x1b[0m`
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
        message.includes(")") ||
        message.includes(")") ||
        message.includes("*") ||
        message.includes("<") ||
        message.includes(">")
      ) {
        console.log(
          `\x1b[4mПотенциальное сообщение:\x1b[0m \x1b[36m${message}\x1b[0m`
        );
        throw new Error("В ответе содержатся подозрительные символы");
      }

      if (
        message.includes("online") ||
        message.includes("всего несколько минут")
      ) {
        console.log(
          `\x1b[4mПотенциальное сообщение:\x1b[0m \x1b[36m${message}\x1b[0m`
        );
        throw new Error("В ответе содержится подозрительное слово");
      }

      const varMessage = capitalizeFirstLetter(
        message
          .replace("Приветствую! ", "")
          .replace("Приветствую!", "")
          .replace("Приветствую, ", "")
          .replace("Приветствую,", "")
          .replace("Приветствую", "")
          .replace("приветствую", "")
          .replace("Привет, ", "")
          .replace("Привет,", "")
          .replace("Привет! ", "")
          .replace("Привет!", "")
          .replace("Здравствуйте, ", "")
          .replace("Здравствуйте,", "")
          .replace("Здравствуйте! ", "")
          .replace("Здравствуйте!", "")
          .replace("Здравствуй, ", "")
          .replace("Здравствуй,", "")
          .replace("Здравствуй! ", "")
          .replace("Здравствуй!", "")
          .replace("Доброе утро, ", "")
          .replace("Доброе утро,", "")
          .replace("Доброе утро! ", "")
          .replace("Доброе утро!", "")
          .replace("Добрый вечер,", "")
          .replace("Добрый вечер! ", "")
          .replace("Добрый вечер!", "")
          .replace("Добрый день,", "")
          .replace("Добрый день! ", "")
          .replace("Добрый день!", "")
          .replace("Привет", "")
          .replace("Здравствуйте", "")
          .replace("Здравствуй", "")
          .replace("Доброе утро", "")
          .replace("Добрый вечер", "")
          .replace("Добрый день", "")
          .replace("привет", "")
          .replace("здравствуйте", "")
          .replace("здравствуй", "")
          .replace("доброе утро", "")
          .replace("добрый вечер", "")
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

      if (message.length > 325) {
        console.log(
          `Начинаю генерацию нового сообщения, текущая длина сообщения: ${message.length}`
        );
        console.log(
          `\x1b[4mПотенциальное сообщение:\x1b[0m \x1b[36m${message}\x1b[0m`
        );

        const newMessaage = await makeRequestComplete(
          `СООБЩЕНИЕ ДО: '''${message}'''\n СООБЩЕНИЕ ПОСЛЕ СОКРАЩЕНИЯ ДО 275 СИМВОЛОВ (формат СООБЩЕНИЕ ПОСЛЕ СОКРАЩЕНИЯ должен полностью соответствовать формату СООБЩЕНИЕ ДО):`,
          disableLink,
          deleteQuestion,
          minimalProposalLength,
          part
        );

        console.log(
          `Сгенерировано новое сообщение: ${newMessaage}, длина нового сообщения ${newMessaage.length}`
        );

        return newMessaage;
      }

      return varMessage;
    } catch (error: any) {
      console.log(`Ошибка запроса. ${error.message}`);
    }
  }
};
