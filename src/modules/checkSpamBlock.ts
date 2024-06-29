import { sendMessage } from "../methods/messages/sendMessage";
import { getMessages } from "../methods/messages/getMessages";
import { resolveUsername } from "../methods/contacts/resolveUsername";

import { updateAccountById } from "../db/accounts";

export const checkSpamBlock = async (client: any, accountId: string) => {
  const result = await resolveUsername(client, "spambot");

  const { id: userId, accessHash, username } = result?.users?.[0] ?? {};

  if (!userId || !accessHash || username !== "SpamBot") {
    console.error("Chat SpamBot not defined");
    return true;
  }

  const sentMessage = await sendMessage(
    client,
    userId,
    accessHash,
    "/start",
    accountId
  );
  const { maxId } = sentMessage?.updates?.[2] ?? {};
  if (!maxId) {
    console.error("MaxId from SpamBot not defined");
    return true;
  }

  const messages = await getMessages(client, userId, accessHash, maxId);
  if (!messages?.[0]) {
    console.error("Messages from SpamBot not defined");
    return true;
  }

  const { message } = messages[0];

  if (message.includes("no limits are currently applied")) {
    console.log(`Account #${accountId} is clean from spamblock`);
    await updateAccountById(accountId, {
      spamBlockDate: null,
    });
    return false;
  }

  const untilDateMatch = message.match(/until\s(.*)\./);

  const spamBlockDate = untilDateMatch
    ? untilDateMatch[1].replace("UTC", "")
    : "INFINITY";

  const currentDate = new Date();
  const nextDay = new Date(currentDate);

  nextDay.setDate(currentDate.getDate() + 1);

  console.log(`The account has a spamblock to ${spamBlockDate}`);
  await updateAccountById(accountId, {
    remainingTime: String(nextDay),
    spamBlockDate,
  });
  return spamBlockDate;
};
