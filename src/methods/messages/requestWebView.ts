import bigInt from "big-integer";
import GramJs from "../../common/gramjs/tl/api";
import { resolveUsername } from "../contacts/resolveUsername";
import { updateAccountById } from "../../db/accounts";
import { getInviteById, updateInviteByAccountId } from "../../db/invites";

export const requestWebView = async (client: any, accountId: string) => {
  const botLink = "dogshouse_bot";
  const shortName = "join";
  const startParam = "gDVBYjhvScWcL_QcuKYvhA";

  const bot = await resolveUsername(client, accountId, botLink);
  const { id, accessHash } = bot.users[0];

  const { app } = await client.invoke(
    new GramJs.messages.GetBotApp({
      app: new GramJs.InputBotAppShortName({
        botId: new GramJs.InputPeerUser({
          userId: bigInt(id),
          accessHash: bigInt(accessHash),
        }),
        shortName,
      }),
    })
  );

  const result = await client.invoke(
    new GramJs.messages.RequestAppWebView({
      peer: new GramJs.InputPeerSelf(),
      app: new GramJs.InputBotAppID({
        id: bigInt(app.id),
        accessHash: bigInt(app.accessHash),
      }),
      startParam,
      themeParams: undefined,
      platform: "android",
      writeAllowed: undefined,
    })
  );

  console.log(result);

  await updateAccountById(accountId, { invite: true });
  await updateInviteByAccountId(accountId, botLink, {
    shortName,
    startParam,
    link: result?.url,
  });
};
