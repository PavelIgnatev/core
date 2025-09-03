import TelegramClient from '../../gramjs/client/TelegramClient';
import GramJs from '../../gramjs/tl/api';
import { Account } from '../@types/Account';
import { updateAccountById } from '../db/accounts';
import { generateAppealFlow } from '../helpers/frozen/generateAppealFlow';
import { generateDailyUsage } from '../helpers/frozen/generateDailyUsage';
import { generateDiscoverySource } from '../helpers/frozen/generateDiscoverySource';
import { generateEmailFromName } from '../helpers/frozen/generateEmailFromName';
import { getYearById } from '../helpers/frozen/getYearById';
import { sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { getFrozenReason } from '../llm/getFrozenReason';
import { getHackedReason } from '../llm/getHackedReason';
import { resolveUsername } from '../methods/contacts/resolveUsername';
import { getHistory } from '../methods/messages/getHistory';
import { sendMessage } from '../methods/messages/sendMessage';
import { solveCaptcha } from './solveCaptcha';

const submitFrozenAppeal = async (
  client: TelegramClient,
  account: Account,
  userId: string,
  accessHash: string,
  frozenLegalName: string
) => {
  const { accountId, id } = account;

  try {
    const startMessage = await sendMessage(
      client,
      userId,
      accessHash,
      '/start',
      accountId,
      false,
      false,
      false
    );

    await sleep(5000);
    const startHistory = await getHistory(
      client,
      userId,
      accessHash,
      startMessage.id
    );
    const startResponse = startHistory[0]?.message;

    if (!startResponse) {
      throw new Error('FROZEN_BOT_NO_START_RESPONSE');
    }

    if (!startResponse.includes('blocked for violations')) {
      throw new Error('FROZEN_BOT_START_RESPONSE_MISSING_VIOLATIONS');
    }

    const appealFlow = generateAppealFlow();
    const responseText =
      appealFlow === 'hacked' ? 'My account was hacked' : 'This is a mistake';

    const mistakeMessage = await sendMessage(
      client,
      userId,
      accessHash,
      responseText,
      accountId,
      false,
      false,
      false
    );

    await sleep(5000);
    const mistakeHistory = await getHistory(
      client,
      userId,
      accessHash,
      mistakeMessage.id
    );
    const mistakeResponse = mistakeHistory[0]?.message;

    if (!mistakeResponse) {
      throw new Error('FROZEN_BOT_NO_MISTAKE_RESPONSE');
    }

    if (mistakeResponse.includes('already submitted')) {
      return;
    }

    if (!mistakeResponse.includes('submit a complaint')) {
      throw new Error('FROZEN_BOT_MISTAKE_RESPONSE_MISSING_COMPLAINT');
    }

    const complaintMessage = await sendMessage(
      client,
      userId,
      accessHash,
      'Yes',
      accountId,
      false,
      false,
      false
    );

    await sleep(5000);
    const complaintHistory = await getHistory(
      client,
      userId,
      accessHash,
      complaintMessage.id
    );
    const complaintResponse = complaintHistory[0]?.message;

    if (!complaintResponse) {
      throw new Error('FROZEN_BOT_NO_COMPLAINT_RESPONSE');
    }

    const expectedComplaintText =
      appealFlow === 'hacked'
        ? 'When and how was your account compromised'
        : 'what went wrong';
    if (!complaintResponse.includes(expectedComplaintText)) {
      throw new Error('FROZEN_BOT_COMPLAINT_RESPONSE_MISSING');
    }

    const detailsText =
      appealFlow === 'hacked'
        ? await getHackedReason({
            llmParams: {
              messages: [],
              model: 'command-a-03-2025',
              temperature: 1,
              presence_penalty: 0.8,
              p: 0.85,
            },
            options: {},
          })
        : await getFrozenReason({
            llmParams: {
              messages: [],
              model: 'command-a-03-2025',
              temperature: 1,
              presence_penalty: 0.8,
              p: 0.85,
            },
            options: {},
          });
    const dailyUsageText = generateDailyUsage();
    const discoverySourceText = generateDiscoverySource();

    const detailsMessage = await sendMessage(
      client,
      userId,
      accessHash,
      detailsText,
      accountId,
      false,
      false,
      false
    );

    await sleep(5000);
    const detailsHistory = await getHistory(
      client,
      userId,
      accessHash,
      detailsMessage.id
    );
    const detailsResponse = detailsHistory[0]?.message;

    if (!detailsResponse) {
      throw new Error('FROZEN_BOT_NO_DETAILS_RESPONSE');
    }

    if (!detailsResponse.includes('full legal name')) {
      throw new Error('FROZEN_BOT_DETAILS_RESPONSE_MISSING_LEGAL_NAME');
    }

    const nameMessage = await sendMessage(
      client,
      userId,
      accessHash,
      frozenLegalName,
      accountId,
      false,
      false,
      false
    );

    await sleep(5000);
    const nameHistory = await getHistory(
      client,
      userId,
      accessHash,
      nameMessage.id
    );
    const nameResponse = nameHistory[0]?.message;

    if (!nameResponse) {
      throw new Error('FROZEN_BOT_NO_NAME_RESPONSE');
    }

    if (!nameResponse.includes('contact email')) {
      throw new Error('FROZEN_BOT_NAME_RESPONSE_MISSING_EMAIL');
    }

    const emailMessage = await sendMessage(
      client,
      userId,
      accessHash,
      generateEmailFromName(frozenLegalName),
      accountId,
      false,
      false,
      false
    );

    await sleep(5000);
    const emailHistory = await getHistory(
      client,
      userId,
      accessHash,
      emailMessage.id
    );
    const emailResponse = emailHistory[0]?.message;

    if (!emailResponse) {
      throw new Error('FROZEN_BOT_NO_EMAIL_RESPONSE');
    }

    if (!emailResponse.includes('year did you sign up')) {
      throw new Error('FROZEN_BOT_EMAIL_RESPONSE_MISSING_SIGNUP_YEAR');
    }

    const yearMessage = await sendMessage(
      client,
      userId,
      accessHash,
      String(getYearById(id)),
      accountId,
      false,
      false,
      false
    );

    await sleep(5000);
    const yearHistory = await getHistory(
      client,
      userId,
      accessHash,
      yearMessage.id
    );
    const yearResponse = yearHistory[0]?.message;

    if (!yearResponse) {
      throw new Error('FROZEN_BOT_NO_YEAR_RESPONSE');
    }

    if (!yearResponse.includes('discovered Telegram')) {
      throw new Error('FROZEN_BOT_YEAR_RESPONSE_MISSING_DISCOVERED_TELEGRAM');
    }

    const discoveryMessage = await sendMessage(
      client,
      userId,
      accessHash,
      discoverySourceText,
      accountId,
      false,
      false,
      false
    );

    await sleep(5000);
    const discoveryHistory = await getHistory(
      client,
      userId,
      accessHash,
      discoveryMessage.id
    );
    const discoveryResponse = discoveryHistory[0]?.message;

    if (!discoveryResponse) {
      throw new Error('FROZEN_BOT_NO_DISCOVERY_RESPONSE');
    }

    if (!discoveryResponse.includes('daily use of Telegram')) {
      throw new Error('FROZEN_BOT_DISCOVERY_RESPONSE_MISSING_DAILY_USE');
    }

    const usageMessage = await sendMessage(
      client,
      userId,
      accessHash,
      dailyUsageText,
      accountId,
      false,
      false,
      false
    );

    await sleep(5000);
    const usageHistory = await getHistory(
      client,
      userId,
      accessHash,
      usageMessage.id
    );
    const usageResponse = usageHistory[0]?.message;

    if (!usageResponse) {
      throw new Error('FROZEN_BOT_NO_USAGE_RESPONSE');
    }

    if (!usageResponse.includes('acknowledge and agree')) {
      throw new Error('FROZEN_BOT_USAGE_RESPONSE_MISSING_ACKNOWLEDGE_AGREE');
    }

    await new Promise((r) =>
      setTimeout(r, (Math.floor(Math.random() * 300) + 1) * 1000)
    );

    const confirmMessage = await sendMessage(
      client,
      userId,
      accessHash,
      'Confirm',
      accountId,
      false,
      false,
      false
    );

    await sleep(5000);
    const confirmHistory = await getHistory(
      client,
      userId,
      accessHash,
      confirmMessage.id
    );
    const confirmResponse = confirmHistory[0]?.message;

    if (!confirmResponse) {
      throw new Error('FROZEN_BOT_NO_CONFIRM_RESPONSE');
    }

    if (!confirmResponse.includes('verify you are a human')) {
      throw new Error('FROZEN_BOT_CONFIRM_RESPONSE_MISSING_VERIFY_HUMAN');
    }

    const captchaUrl = confirmHistory[0].entities?.filter(
      (e) => e instanceof GramJs.MessageEntityTextUrl
    )?.[0]?.url;

    if (!captchaUrl) {
      throw new Error('FROZEN_BOT_CAPTCHA_URL_MISSING');
    }

    const captchaResult = await solveCaptcha(
      client,
      accountId,
      userId,
      accessHash,
      captchaUrl
    );

    if (!captchaResult) {
      throw new Error('FROZEN_BOT_CAPTCHA_SOLVE_FAILED');
    }

    const captchaResponse = captchaResult[0]?.message;

    if (!captchaResponse) {
      throw new Error('FROZEN_BOT_NO_CAPTCHA_RESPONSE');
    }

    if (!captchaResponse.includes('successfully submitted')) {
      throw new Error('FROZEN_BOT_CAPTCHA_RESPONSE_MISSING_SUCCESS');
    }

    await updateAccountById(accountId, {
      frozenAppealDates: [
        ...(account.frozenAppealDates || []),
        {
          date: new Date(),
          appealFlow,
          detailsText,
          dailyUsageText,
          discoverySourceText,
        },
      ],
    });

    return true;
  } catch (error: any) {
    await sendToMainBot(`** FROZEN_APPEAL_ERROR **
ACCOUNT_ID: ${accountId}
ERROR: ${error.message}`);

    throw error;
  }
};

export const solveFrozen = async (
  client: TelegramClient,
  account: Account,
  frozenLegalName: string
) => {
  const { accountId } = account;

  await new Promise((r) =>
    setTimeout(r, (Math.floor(Math.random() * 60) + 1) * 1000)
  );

  try {
    const result = await resolveUsername(client, 'spambot');

    if (
      !result ||
      !result.users.length ||
      !(result.users[0] instanceof GramJs.User)
    ) {
      throw new Error('SPAMBOT_NOT_USER');
    }

    const { id: userId, accessHash, username } = result.users[0];
    if (!accessHash || !username || username !== 'SpamBot') {
      throw new Error('SPAMBOT_NOT_FOUND');
    }

    await submitFrozenAppeal(
      client,
      account,
      String(userId),
      String(accessHash),
      frozenLegalName
    );

    return true;
  } catch (error: any) {
    await sendToMainBot(`** SOLVE_FROZEN_ERROR **
ACCOUNT_ID: ${accountId}
ERROR: ${error.message}`);

    return false;
  }
};
