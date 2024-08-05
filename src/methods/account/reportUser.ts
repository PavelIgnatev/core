import BigInt from "big-integer";

import GramJs from "../../common/gramjs/tl/api";
import { resolveUsername } from "../contacts/resolveUsername";
import { makeRequestGpt } from "../../modules/makeRequestGpt";
import { sendToFormBot } from "../../helpers/sendToFormBot";

export const reportUser = async (
  client: any,
  accountId: string,
  username: string
) => {
  const initialReportMessage = `Контент, продаваемый через бот @Sarkorov_bot, принадлежит Арсену Маркаряну и другим правообладателям запустившим проект Grind University с обучением on-line профессиям. Также, важно отметить, что в названии канала употребляется термин СЛИВ, что явно позиционирует канал как нарушителя авторских прав. ${
    Math.random() >= 0.7
      ? "Я, как подписчик и Арсена Маркаряна и последовтель курса Grind University не хотел бы, чтобы кто-то другой зарабатывал на нем и поэтому жалуюсь на данный канал."
      : ""
  } Буду признетелен, если вы заблокируете данного бота, нарушающего права на контент.`;
  const initialReportContext = `## CONTEXT
Ты подписчик Арсена маркаряна и человек, который проходит Grind University. Ты возмущен тем, что кто-то зарабатывает на контенте Арсена Маркаряна, продаваемом через бота @Sarkorov_bot и не стесняясь, даже пишет, что он занимается именно СЛИВом, он написал это в описании бота @Sarkorov_bot, в названии.
    
## STYLE GUIDE
Avoid including unnecessary greetings and third-party characters like: [],{},{},|,<>,(),* and etc. The resulting response language should be consistent with the original message. RESPONSE LANGUAGE: RUSSIAN.
    
## INSTRUCTIONS
I need you to paraphrase a message (which is inside '''') while maintaining its original meaning, structure, and character count. Make sure the resulting message is the same length as the original, and conveys the same thought in a unique but similar way to the original message. RESPONSE LANGUAGE: RUSSIAN. Make sure that the result does not contain any words other than RUSSIOAN (except for proper names).`;

  const firstIterationReportMessage = await makeRequestGpt(
    initialReportContext,
    `A message where the wording needs to be changed: ''''${initialReportMessage}''''`,
    "experemenatal-report-acc",
    accountId,
    null
  );
  const secondIterationReportMessage = await makeRequestGpt(
    initialReportContext,
    `A message where the wording needs to be changed: ''''${firstIterationReportMessage}''''`,
    "experemenatal-report-acc",
    accountId,
    null
  );

  const { users } = await resolveUsername(client, accountId, username);
  const { id, accessHash } = users[0];

  const userPeer = new GramJs.InputPeerUser({
    userId: BigInt(id),
    accessHash: BigInt(accessHash),
  });

  await new Promise((resolve) => {
    const min = 1;
    const max = 25;
    const randomMinutes = Math.floor(Math.random() * (max - min + 1)) + min;

    const randomMilliseconds = randomMinutes * 60 * 1000;
    console.log(`[${accountId}] Wait ${randomMinutes}min before send report`);
    setTimeout(resolve, randomMilliseconds);
  });

  const reportFirst = await client.invoke(
    new GramJs.account.ReportPeer({
      peer: userPeer,
      reason: new GramJs.InputReportReasonCopyright(),
      message: "",
    })
  );
  const reportSecond = await client.invoke(
    new GramJs.account.ReportPeer({
      peer: userPeer,
      reason: new GramJs.InputReportReasonFake(),
      message: "",
    })
  );

  await sendToFormBot(`**** REPORT SPAM ****
ДО: ${firstIterationReportMessage}
ПОСЛЕ: ${secondIterationReportMessage}`);

  return [reportFirst, reportSecond];
};
