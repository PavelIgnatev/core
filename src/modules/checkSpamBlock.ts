import { sendMessage } from "../methods/messages/sendMessage";
import { getMessages } from "../methods/messages/getMessages";
import { resolveUsername } from "../methods/users/resolveUsername";
import { updateAiAccount } from "../methods/accounts/updateAiAccount";

export const checkSpamBlock = async (accountId: string) => {
  const result = await resolveUsername("spambot");

  const { id: userId, accessHash, username } = result?.users?.[0] ?? {};

  if (!userId || !accessHash || username !== "SpamBot") {
    console.error("Chat SpamBot not defined");
    return true;
  }

  const sentMessage = await sendMessage(
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

  const messages = await getMessages(userId, accessHash, maxId);
  if (!messages?.[0]) {
    console.error("Messages from SpamBot not defined");
    return true;
  }

  const { message } = messages[0];

  if (message.includes("no limits are currently applied")) {
    console.log(`Account #${accountId} is clean from spamblock`);
    await updateAiAccount(accountId, {
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
  await updateAiAccount(accountId, {
    remainingTime: String(nextDay),
    spamBlockDate,
  });
  return spamBlockDate;
};
