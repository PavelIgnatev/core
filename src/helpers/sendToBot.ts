import axios from "axios";
import { red } from "colors/safe";

export const sendToBot = async (text: string) => {
  const token = "6324276078:AAEGmvX4RI-qoJnKkNpBFhVYuYJTyHweCIo";
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
