import { DB } from "./db";

const getMessagesCollection = async () => {
  return (await DB()).collection("messages");
};

export const updateFailedMessage = async (username: string) => {
  const messagesCollection = await getMessagesCollection();

  await messagesCollection.updateOne(
    { username: username.toLowerCase() },
    { $set: { failed: true } },
    { upsert: true }
  );
};
