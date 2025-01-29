import 'dotenv/config';
import './helpers/errors';

import { getAccounts, getAccountsReLogin } from './db/accounts';
import { makeMetrics } from './helpers/makeMetrics';
import { waitConsole } from './helpers/setConsole.log';
import { checker } from './modules/checker';
import { relogin } from './modules/relogin';

const reLoginner = async () => {
  const accounts = await getAccountsReLogin();
  if (!accounts.length) {
    return;
  }

  console.log({
    message: '💥 RELOGIN ITERATION INIT 💥',
    prefix: 'GLOBAL_METRICS',
    accountId: 'GLOBAL_METRICS_RELOGIN',
    payload: accounts,
  });
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

  console.log({
    message: '💥 CHECK ITERATION INIT 💥',
    prefix: 'GLOBAL_METRICS',
    accountId: 'GLOBAL_METRICS_CHECKER',
    payload: accounts,
  });
  const startCheckerTime = performance.now();
  const checkerPromises: Promise<any>[] = [];
  const checkerAccounts: Record<string, number> = {};
  accounts.forEach((accountId: string) => {
    checkerPromises.push(checker(accountId, checkerAccounts));
  });

  setInterval(() => {
    console.log({
      message: `CHECK ITERATION IN PROGRESS (${Object.keys(checkerAccounts).length})`,
      prefix: 'GLOBAL_METRICS',
      accountId: 'GLOBAL_METRICS_CHECKER',
      checkerAccounts,
    });
  }, 60000);

  await Promise.all(checkerPromises).then(async (clients) => {
    await makeMetrics(clients, startCheckerTime, 'CHECKER');
  });
};

const main = async () => {
  // await reLoginner();
  await reChecker();

  await waitConsole();
  process.exit(1);
};

main();
