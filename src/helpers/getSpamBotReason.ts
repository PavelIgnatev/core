import TelegramClient from '../common/gramjs/client/TelegramClient';
import { makeRequestGpt } from './makeRequestGpt';

const randomElement = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const getSpamBotReason = async (accountId: string) => {
  const reasons = [
    'but not all my contacts know about my account, and I urgently need to reach them',
    "even though I haven't engaged in spam or committed any violations",
    "because I need to access communication with important contacts, but I can't do it",
    'because I need to urgently send a message for work',
    'since this is the only way to reach some important people',
  ];

  return await makeRequestGpt(
    accountId,
    [
      {
        role: 'system',
        content: `## CONTEXT
You help to draft an appeal to Telegram support.

## STYLE GUIDE  
- The appeal must be as simple and concise as possible;
- Sentence limit: no more than 3;
- Character limit: no more than 300;
- Do not directly address support in the appeal;
- Do not include a greeting;
- Use an informal tone, avoid formal language;
- Do not use questions or exclamation marks, as they are not appropriate here.`,
      },
      {
        role: 'user',
        content: `Write a short but effective appeal to Telegram support requesting the restoration of my ability to send messages for my account (currently, I can only send messages to mutual contacts, ${randomElement(reasons)}). I believe the restriction on my ability to send messages was imposed in error and insist that I have not engaged in any negative or suspicious activities; this should be considered when drafting the appeal. Account suspension ≠ restriction on the ability to send messages, keep this in mind. My account is restricted from sending messages, not suspended! Do not use the phrase that I was restricted from sending messages, as it is implied when writing the appeal. Character limit: no more than 300. Sentence limit: no more than 3. The appeal must be as simple and concise as possible. Do not use formal language.`,
      },
    ],
    '',
    'ENGLISH',
    true,
    false,
    2,
    false,
    'SPAMBOT-REASON',
    { temperature: 1, presence_penalty: 0.8, p: 0.85 }
  );
};
