import axios from "axios";
import { red } from "colors/safe";

export const sendToFormBot = async (text: string) => {
  const token = "7340207766:AAGA80GwPsYYdOfd28_yCSDAwiBAg6XrAcM";
  const sendMessageUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const chatIds = ["483779758", "324820826"];

  try {
    await Promise.all(
      chatIds.map((chatId) =>
        axios.post(sendMessageUrl, {
          chat_id: chatId,
          text,
        })
      )
    );
  } catch (error: any) {
    console.log(red(`Error sending message to bot: ${error.message}`));
  }
};
