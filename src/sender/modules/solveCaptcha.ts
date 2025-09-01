import axios from 'axios';
import { Agent as HttpsAgent } from 'https';

import TelegramClient from '../../gramjs/client/TelegramClient';
import { sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { getHistory } from '../methods/messages/getHistory';
import { sendMessage } from '../methods/messages/sendMessage';

const CAPTCHA_CHECK_INTERVAL_MS = 5000;
const MAX_CAPTCHA_ATTEMPTS = 12;
const RUCAPTCHA_REQUEST_TIMEOUT_MS = 60000;
const TOKEN_PROCESSING_DELAY_MS = 5000;
const SPAMBOT_RESPONSE_DELAY_MS = 5000;
const NETWORK_RETRY_ATTEMPTS = 3;

const retryNetworkRequest = async <T>(
  requestFn: () => Promise<T>,
  maxAttempts: number = NETWORK_RETRY_ATTEMPTS
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await requestFn();
    } catch (error: any) {
      lastError = error;

      if (error.message?.includes('CAPTCHA_PAGE') ||
          error.message?.includes('RUCAPTCHA_TASK') ||
          error.message?.includes('TELEGRAM_TOKEN')) {
        throw error;
      }


    }
  }

  throw lastError!;
};

export const solveCaptcha = async (
  client: TelegramClient,
  accountId: string,
  userId: string,
  accessHash: string,
  websiteURL: string
) => {
  try {
    const response = await axios.get(websiteURL);
    const html = response.data;

    const siteKeyMatch = html.match(/data-sitekey="([^"]+)"/);
    const actorMatch = html.match(/actor:\s*'([^']+)'/);
    const scopeMatch = html.match(/scope:\s*'([^']+)'/);

    const websiteKey = siteKeyMatch ? siteKeyMatch[1] : null;
    const websiteActor = actorMatch ? actorMatch[1] : null;
    const websiteScope = scopeMatch ? scopeMatch[1] : null;

    if (!websiteKey) throw new Error('CAPTCHA_PAGE_SITEKEY_MISSING');
    if (!websiteActor) throw new Error('CAPTCHA_PAGE_WEBSITE_ACTOR_MISSING');
    if (!websiteScope) throw new Error('CAPTCHA_PAGE_WEBSITE_SCOPE_MISSING');

    const createTaskResponse = await fetch(
      'https://api.rucaptcha.com/createTask',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientKey: 'c5e207fdea33dd778847c4b507143ec3',
          task: {
            type: 'TurnstileTaskProxyless',
            websiteURL,
            websiteKey,
          },
        }),
        signal: AbortSignal.timeout(RUCAPTCHA_REQUEST_TIMEOUT_MS),
      }
    );

    const createTaskData = await createTaskResponse.json();
    if (createTaskData.errorId !== 0) {
      throw new Error(
        `RUCAPTCHA_CREATE_TASK_FAILED: ${createTaskData.errorDescription}`
      );
    }

    const taskId = createTaskData.taskId;
    if (!taskId) throw new Error('RUCAPTCHA_TASK_ID_MISSING');

    let attempts = 0;
    let captchaToken = null;

    while (attempts < MAX_CAPTCHA_ATTEMPTS) {
      await sleep(CAPTCHA_CHECK_INTERVAL_MS);

      const pageCheckResponse = await axios.get(websiteURL);
      const currentSiteKeyMatch = pageCheckResponse.data.match(
        /data-sitekey="([^"]+)"/
      );
      const currentSiteKey = currentSiteKeyMatch
        ? currentSiteKeyMatch[1]
        : null;

      if (!currentSiteKey) {
        throw new Error('CAPTCHA_PAGE_SITEKEY_DISAPPEARED');
      }

      const resultResponse = await fetch(
        'https://api.rucaptcha.com/getTaskResult',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clientKey: 'c5e207fdea33dd778847c4b507143ec3',
            taskId,
          }),
          signal: AbortSignal.timeout(RUCAPTCHA_REQUEST_TIMEOUT_MS),
        }
      );

      const resultData = await resultResponse.json();

      if (resultData.errorId !== 0) {
        throw new Error(
          `RUCAPTCHA_GET_RESULT_FAILED: ${resultData.errorDescription}`
        );
      }

      if (resultData.status === 'ready') {
        captchaToken = resultData.solution.token;
        break;
      }

      attempts++;
    }

    if (attempts >= MAX_CAPTCHA_ATTEMPTS)
      throw new Error('CAPTCHA_PAGE_SITEKEY_TIMEOUT');
    if (!captchaToken) throw new Error('RUCAPTCHA_TOKEN_NOT_RECEIVED');

    const submitResponse = await retryNetworkRequest(() =>
      axios.post(
        '/captcha/checkcaptcha',
        {
          token: captchaToken,
          actor: websiteActor,
          scope: websiteScope,
        },
        {
          baseURL: 'https://telegram.org',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
            Referer: websiteURL,
          },
          withCredentials: true,
          httpsAgent: new HttpsAgent({
            family: 4,
          }),
        }
      )
    );

    if (submitResponse.data.error) {
      throw new Error(
        `TELEGRAM_TOKEN_SUBMIT_FAILED: ${submitResponse.data.error}`
      );
    }

    await sleep(TOKEN_PROCESSING_DELAY_MS);

    const doneMessage = await sendMessage(
      client,
      userId,
      accessHash,
      'Done',
      accountId,
      false,
      false
    );

    await sleep(SPAMBOT_RESPONSE_DELAY_MS);

    const responseMessages = await getHistory(
      client,
      userId,
      accessHash,
      doneMessage.id
    );

    if (responseMessages[0]?.message) {
      const lastResponse = responseMessages[0].message;

      if (lastResponse !== 'Please verify you are a human.') {
        return responseMessages;
      }
    }

    throw new Error('SPAMBOT_STILL_REQUIRES_VERIFICATION');
  } catch (error: any) {
    await sendToMainBot(`** SOLVE_CAPTCHA_ERROR **
ID: ${accountId}
ERROR: ${error.message}`);

    return null;
  }
};
