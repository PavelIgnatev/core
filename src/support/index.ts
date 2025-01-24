import 'dotenv/config';
import './helpers/setConsole.log';
import './helpers/errors';

import { getAccounts, getAccountsReLogin } from './db/accounts';
import { sleep } from './helpers/helpers';
import { makeMetrics } from './helpers/makeMetrics';
import { checker } from './modules/checker';
import { relogin } from './modules/relogin';

const reLoginner = async () => {
  const accounts = await getAccountsReLogin();
  if (!accounts.length) {
    return;
  }

  console.log({ message: '💥 RELOGIN ITERATION INIT 💥' });
  const startCheckerTime = performance.now();
  const reloginPromises: Promise<any>[] = [];

  accounts.forEach((accountId: string) => {
    reloginPromises.push(relogin(accountId));
  });

  await Promise.all(reloginPromises).then(async (clients) => {
    await makeMetrics(clients.flat(1), startCheckerTime, 'RELOGIN');
  });
};

const reChecker = async () => {
  const accounts = await getAccounts();

  console.log({ message: '💥 CHECK ITERATION INIT 💥' });
  const startCheckerTime = performance.now();
  const checkerPromises: Promise<any>[] = [];
  const checkerAccounts: Record<string, number> = {};
  accounts.forEach((accountId: string) => {
    checkerPromises.push(checker(accountId, checkerAccounts));
  });

  setInterval(() => {
    console.log({
      message: `CHECK ITERATION IN PROGRESS (${Object.keys(checkerAccounts).length})`,
      checkerAccounts,
    });
  }, 60000);

  await Promise.all(checkerPromises).then(async (clients) => {
    await makeMetrics(clients, startCheckerTime, 'CHECK');
  });
};

const main = async () => {
  // await reLoginner();
  await reChecker();

  await sleep(10000);
  process.exit(1);
};

main();
