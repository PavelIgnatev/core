import { red } from 'colors/safe';

import { sendToBot } from '../../helpers/sendToBot';
import { sleep } from '../../helpers/sleep';

const defaultFirstMessagePrompt = 'Здравствуйте!';
const defaultSecondMessagePrompt =
  '{Я |}{заметил|увидел|обратил внимание|правильно понимаю|правильно понял|правильно предполагаю|предполагаю|обнаружил|верно понял|запомнил|подметил}, {что вы|что Вы|вы|Вы} {предприниматель|ведете бизнес|занимаетесь предпринимательской деятельностью|занимаетесь предпринимательством|занимаетесь ведением бизнеса|занимаетесь коммерческой деятельностью}{?|.|,} {это так|я прав|прав ли я|это правда|так ли это|это действительно так|действительно ли так|не ошибся|верно|это верно}?';

export const getRecipient = async (accountId: string) => {
  while (true) {
    try {
      console.log(`[${accountId}] Init get recipient`);
      const response = await fetch(`${process.env.RECIPIENT_URL}`);
      const user = await response.json();

      if (!user?.groupId || !user?.username) {
        await sendToBot(
          `При генерации recipient произошла ошибка: ${JSON.stringify(user)}:${
            user?.groupId
          }:${user?.username}`
        );
      }

      if (!user.firstMessagePrompt) {
        user.firstMessagePrompt = defaultFirstMessagePrompt;
      }
      if (!user.secondMessagePrompt) {
        user.secondMessagePrompt = defaultSecondMessagePrompt;
      }

      return user;
    } catch (error: any) {
      console.log(red(`[${accountId}] Get recipient error: ${error.message}`));
      await sleep(3000);
    }
  }
};
