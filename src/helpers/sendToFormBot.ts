export const sendToFormBot = async (text: string) => {
  const token = "7340207766:AAGA80GwPsYYdOfd28_yCSDAwiBAg6XrAcM";
  const sendMessageUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  for (const chatId of ["483779758", "324820826"]) {
    await fetch(sendMessageUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });
  }
};
