import BigInt from "big-integer";

import GramJs from "../../gramjs/tl/api";

function reduceSpaces(string: string) {
  return string.replace(/\s+/g, " ").trim();
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeNonAlphaPrefix(string: string) {
  if (string === "/start") {
    return string;
  }

  return string.replace(/^[^a-zA-Zа-яА-Я]+/, "");
}

export const sendMessage = async (
  client: any,
  userId: string,
  accessHash: string,
  message: string,
  accountId: string
) => {
  try {
    const sentMessage = await client.invoke(
      new GramJs.messages.SendMessage({
        message: removeNonAlphaPrefix(
          capitalizeFirstLetter(reduceSpaces(message))
        ),
        clearDraft: true,
        peer: new GramJs.InputPeerUser({
          userId: BigInt(userId),
          accessHash: BigInt(accessHash),
        }),
        randomId: BigInt(Math.floor(Math.random() * 10 ** 10) + 10 ** 10),
      })
    );

    return sentMessage;
  } catch (e: any) {
    const token = "6324276078:AAEGmvX4RI-qoJnKkNpBFhVYuYJTyHweCIo";
    const sendMessageUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    for (const chatId of ["483779758", "324820826"]) {
      await fetch(sendMessageUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Error: ${JSON.stringify(
            e.message
          )}\nAccountId: ${accountId}.\nUserId: ${userId}\nMessage: ${message}.`,
        }),
      });
    }

    throw new Error("Global Error");
  }
};
