import axios from 'axios';

import { sleep } from '../../helpers/helpers';

const defaultFirstMessagePrompt = 'Здравствуйте!';
const defaultSecondMessagePrompt =
  '{Я |}{заметил|увидел|обратил внимание|правильно понимаю|правильно понял|правильно предполагаю|предполагаю|обнаружил|верно понял|запомнил|подметил}, {что вы|что Вы|вы|Вы} {предприниматель|ведете бизнес|занимаетесь предпринимательством|занимаетесь ведением бизнеса|занимаетесь коммерческой деятельностью}{?|.|,} {это так|я прав|прав ли я|это правда|так ли это|это действительно так|действительно ли так|не ошибся|верно|это верно}?';

export const getRecipient = async (accountId: string) => {
  while (true) {
    try {
      const url = new URL(String(process.env.RECIPIENT_URL));

      if (accountId.includes('-prefix-')) {
        url.searchParams.append('prefix', accountId.split('-prefix-')[1]);
      }

      const { data: user } = await axios(url.toString());

      if (user === 'GROUP_ID_NOT_DEFINED') {
        return null;
      }

      if (!user || !user.username || !user.groupId) {
        throw new Error('USER_NOT_DEFINED');
      }

      if (!user.firstMessagePrompt) {
        user.firstMessagePrompt = defaultFirstMessagePrompt;
      }
      if (!user.secondMessagePrompt) {
        user.secondMessagePrompt = defaultSecondMessagePrompt;
      }

      return user as {
        groupId: string;
        username: string;
        firstMessagePrompt: string;
        secondMessagePrompt: string;
        language?: string;
      };
    } catch (error: any) {
      await sleep(10000);
    }
  }
};
