import 'dotenv/config';
import { exec as childExec } from 'child_process';
import { black, red, yellow } from 'colors/safe';
import util from 'util';
import TelegramClient from './common/gramjs/client/TelegramClient';
import { getAccountById, getAccounts, updateAccountById } from './db/accounts';
import { initClient } from './helpers/initClient';
import { sendToBot } from './helpers/sendToBot';
import { setOffline } from './methods/account/setOffline';
import { usersMe } from './methods/users/usersMe';
import { accountSetup } from './modules/accountSetup';
import { autoResponse } from './modules/autoResponse';
import { autoSender } from './modules/autoSender';

import './helpers/setConsole.log';

const exec = util.promisify(childExec);
const promises: Promise<any>[] = [];
const accountsInWork: Record<string, number> = {};

const main = async (ID: string) => {
  let isAutoResponse = true;
  let setOnlineInterval: any = null;
  let client: TelegramClient | null = null;

  try {
    const account = await getAccountById(ID);
    if (!account) {
      throw new Error('Account not defined');
    }

    const {
      accountId,
      dcId,
      platform,
      userAgent,
      setuped = false,
      id,
      firstName,
    } = account;

    if (![accountId, dcId, platform, userAgent].every(Boolean)) {
      throw new Error('Insufficient number of parameters to start');
    }

    client = await initClient(account, ID, () => (isAutoResponse = true));

    setOnlineInterval = setInterval(() => {
      setOffline(client, accountId, false);
    }, 60000);

    const tgFirstName = await accountSetup(
      client,
      accountId,
      setuped,
      firstName
    );
    const tgAccountId = await usersMe(client, accountId, id);


    // for (let i = 0; i < 30; i++) {
    //   accountsInWork[ID] = i + 1;

    //   console.log(`[${accountId}]`, yellow(`Init iteration [${i + 1}]`));

    //   let timer;
    //   const timeout = new Promise(
    //     (_, rej) =>
    //       (timer = setTimeout(
    //         () =>
    //           rej(
    //             new Error(`Iteration [${i + 1}] took longer than 30 minutes.`)
    //           ),
    //         1800000
    //       ))
    //   );

    //   await Promise.race([
    //     (async () => {
    //       const accountByID = await getAccountById(ID);
    //       if (!accountByID) {
    //         throw new Error('Account not defined');
    //       }

    //       if (isAutoResponse) {
    //         isAutoResponse = false;
    //         await autoResponse(client, accountId, tgAccountId, tgFirstName);
    //       }

    //       await autoSender(
    //         client,
    //         accountId,
    //         tgAccountId,
    //         accountByID.remainingTime || null
    //       );

    //       await new Promise((res) => setTimeout(res, 60000));
    //       console.log(`[${accountId}]`, yellow(`End iteration [${i + 1}]`));
    //     })(),
    //     timeout,
    //   ]);

    //   clearTimeout(timer);
    // }
  } catch (e: any) {
    console.log(red(`[${ID}] Main error: ${e.message}`));

    if (e.message.includes('AUTH_KEY_DUPLICATED')) {
      await updateAccountById(ID, {
        banned: true,
        reason: 'AUTH_KEY_DUPLICATED',
      });
      await sendToBot(`!!!AUTH_KEY_DUPLICATED!!! ID: ${ID}`);
      await exec('pm2 kill');
    } else if (e.message.includes('Global Error')) {
      console.log(red(`[${ID}] Stop account: ${e.message}`));
    } else if (e.message.includes('Stopped')) {
      await updateAccountById(ID, {
        stopped: true,
      });
    } else if (
      [
        'USER_DEACTIVATED_BAN',
        'AUTH_KEY_UNREGISTERED',
        'AUTH_KEY_INVALID',
        'USER_DEACTIVATED',
        'SESSION_REVOKED',
        'SESSION_EXPIRED',
        'AUTH_KEY_PERM_EMPTY',
        'SESSION_PASSWORD_NEEDED',
      ].includes(e.message)
    ) {
      await updateAccountById(ID, {
        banned: true,
        reason: e.message,
      });
      await sendToBot(`!!!БАН АККАУНТА!!! ID: ${ID}; Error: ${e.message}`);
    } else {
      await sendToBot(
        `!!!НЕИЗВЕСТНАЯ ОШИБКА!!! ID: ${ID}; Error: ${e.message}`
      );
    }
  }

  delete accountsInWork[ID];

  if (setOnlineInterval) {
    clearInterval(setOnlineInterval);
  }

  if (client) {
    await client.destroy();
  }
};

getAccounts().then((accounts) => {
  const startTime = performance.now();
  accounts.forEach((accountId: string) => {
    promises.push(main(accountId));
  });

  Promise.all(promises).then(async () => {
    const time = Math.round((performance.now() - startTime) / 1000);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    let timeString;
    if (minutes > 0) {
      timeString = `${minutes}m ${seconds}s`;
    } else {
      timeString = `${seconds}s`;
    }

    await sendToBot(`💥 ITERATION DONE (${timeString}) 💥`);

    process.exit(1);
  });

  setInterval(() => {
    console.log(
      black(JSON.stringify(accountsInWork)),
      yellow(String(Object.keys(accountsInWork).length))
    );
  }, 60000);
});
