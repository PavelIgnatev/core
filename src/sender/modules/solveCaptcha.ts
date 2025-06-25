import TelegramClient from '../../gramjs/client/TelegramClient';
import { sleep } from '../helpers/helpers';
import proxyAxios from '../helpers/proxyAxios';
import { sendMessage } from '../methods/messages/sendMessage';
import { getHistory } from '../methods/messages/getHistory';

export const solveCaptcha = async (
  client: TelegramClient,
  accountId: string,
  userId: string,
  accessHash: string,
  captchaUrl: string
): Promise<string | null> => {
  try {
    console.log('=== STARTING RUCAPTCHA SOLVE ===');
    console.log('CAPTCHA URL:', captchaUrl);

    // Получаем HTML страницы для извлечения параметров
    const response = await proxyAxios.get(captchaUrl);
    const html = response.data;
    
    // Извлекаем sitekey
    const siteKeyMatch = html.match(/data-sitekey="([^"]+)"/);
    const siteKey = siteKeyMatch ? siteKeyMatch[1] : null;

    // Извлекаем actor и scope из JavaScript
    const actorMatch = html.match(/actor:\s*'([^']+)'/);
    const scopeMatch = html.match(/scope:\s*'([^']+)'/);
    const actor = actorMatch ? actorMatch[1] : null;
    const scope = scopeMatch ? scopeMatch[1] : null;

    console.log('Extracted parameters:');
    console.log('- sitekey:', siteKey);
    console.log('- actor:', actor);
    console.log('- scope:', scope);

    if (!siteKey || !actor || !scope) {
      console.log('ERROR: Missing required parameters');
      console.log('HTML preview:', html.substring(0, 500));
      return null;
    }

    // Создаем задачу в RuCaptcha
    const createTaskResponse = await fetch('https://api.rucaptcha.com/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientKey: 'c5e207fdea33dd778847c4b507143ec3',
        task: {
          type: 'TurnstileTaskProxyless',
          websiteURL: captchaUrl,
          websiteKey: siteKey,
        },
      }),
      signal: AbortSignal.timeout(60000),
    });

    const createTaskData = await createTaskResponse.json();
    console.log('Create task response:', createTaskData);

    if (createTaskData.errorId !== 0) {
      throw new Error(`CAPTCHA_API_ERROR: ${createTaskData.errorDescription}`);
    }

    const taskId = createTaskData.taskId;
    console.log('Task created with ID:', taskId);

    // Ожидаем решения капчи
    let attempts = 0;
    const maxAttempts = 40;

    while (attempts < maxAttempts) {
      await sleep(6000);

      console.log(`Attempt ${attempts + 1}/${maxAttempts} - checking result...`);

      const resultResponse = await fetch('https://api.rucaptcha.com/getTaskResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientKey: 'c5e207fdea33dd778847c4b507143ec3',
          taskId,
        }),
        signal: AbortSignal.timeout(60000),
      });

      const resultData = await resultResponse.json();
      console.log(`Result:`, resultData);

      if (resultData.errorId !== 0) {
        throw new Error(`CAPTCHA_RESULT_ERROR: ${resultData.errorDescription}`);
      }

      if (resultData.status === 'ready') {
        const captchaToken = resultData.solution.token;
        console.log('🎉 CAPTCHA SOLVED! Token:', captchaToken.substring(0, 50) + '...');
        
        // Отправляем токен в Telegram для верификации
        console.log('📤 Submitting token to Telegram...');
        try {
          const submitResponse = await proxyAxios.post('/captcha/checkcaptcha', {
            token: captchaToken,
            actor: actor,
            scope: scope
          }, {
            baseURL: 'https://telegram.org',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-Requested-With': 'XMLHttpRequest',
              'Referer': captchaUrl
            },
            withCredentials: true
          });

          console.log('✅ Token submission response:', submitResponse.data);
          
          if (submitResponse.data.error) {
            throw new Error(`Token submission failed: ${submitResponse.data.error}`);
          }
          
          if (submitResponse.data.pending) {
            console.log('⏳ Token is pending, waiting for verification...');
            // Можно добавить дополнительную логику ожидания
          }
          
        } catch (tokenError) {
          const tokenErrorMessage = tokenError instanceof Error ? tokenError.message : String(tokenError);
          console.error('❌ Error submitting token to Telegram:', tokenErrorMessage);
          throw new Error(`TOKEN_SUBMISSION_ERROR: ${tokenErrorMessage}`);
        }
        
        // Дополнительная пауза для обработки токена системой
        console.log('⏳ Waiting 5 seconds for token to be processed...');
        await sleep(5000);
        break;
      }

      attempts++;
    }

    if (attempts >= maxAttempts) {
      throw new Error('CAPTCHA_SOLVE_TIMEOUT');
    }

    console.log('🚀 Proceeding to send Done messages...');
    
    // Отправляем сообщение "Done" несколько раз пока не получим другой ответ
    let doneAttempts = 0;
    const maxDoneAttempts = 10;
    let lastResponse = '';

    while (doneAttempts < maxDoneAttempts) {
      const doneMessage = await sendMessage(
        client,
        userId,
        accessHash,
        'Done',
        accountId,
        false,
        false
      );

      await sleep(5000);

      // Получаем ответ от SpamBot
      const responseMessages = await getHistory(
        client,
        userId,
        accessHash,
        doneMessage.id
      );

      // Проверяем статус капчи после каждой попытки Done
      try {
        const captchaCheckResponse = await proxyAxios.get(captchaUrl);
        const currentSiteKeyMatch = captchaCheckResponse.data.match(/data-sitekey="([^"]+)"/);
        const currentSiteKey = currentSiteKeyMatch ? currentSiteKeyMatch[1] : null;
        
        console.log(`🔍 Captcha URL check after Done ${doneAttempts + 1}: siteKey = ${currentSiteKey}`);
        
        if (!currentSiteKey) {
          console.log('✅ Captcha page no longer has sitekey - verification successful!');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.log(`❌ Error checking captcha URL: ${errorMessage}`);
      }

      if (responseMessages[0]?.message) {
        lastResponse = responseMessages[0].message;
        console.log(
          `✉️  Done attempt ${doneAttempts + 1}: SpamBot response:`,
          lastResponse
        );

        // Если ответ не "Please verify you are a human.", то выходим из цикла
        if (lastResponse !== 'Please verify you are a human.') {
          console.log('🎉 Got different response, breaking loop');
          return lastResponse;
        }
      } else {
        console.log(
          `❌ Done attempt ${doneAttempts + 1}: No response from SpamBot`
        );
      }

      doneAttempts++;

      if (doneAttempts < maxDoneAttempts) {
        await sleep(3000); // Дополнительная пауза между попытками
      }
    }

    if (doneAttempts >= maxDoneAttempts) {
      console.log('⚠️  Max Done attempts reached, last response:', lastResponse);
      return null;
    }

    return lastResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Ошибка при решении капчи:', errorMessage);
    return null;
  }
}; 