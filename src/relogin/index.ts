import 'dotenv/config';
import './helpers/errors';

import { sleep } from '../gramjs/Helpers';
import { getAccountsReCheck, getAccountsReLogin } from './db/accounts';
import { makeMetrics } from './helpers/makeMetrics';
import { waitConsole } from './helpers/setConsole.log';
import { recheck } from './modules/recheck';
import { relogin } from './modules/relogin';

const reLogin = async () => {
  const accounts = await getAccountsReLogin();
  if (!accounts.length) {
    return;
  }

  console.log({
    message: '💥 RE-LOGIN ITERATION INIT 💥',
    prefix: 'GLOBAL_METRICS',
    accountId: 'GLOBAL_METRICS_RELOGIN',
    payload: accounts,
  });

  const startCheckerTime = performance.now();
  const reloginPromises: Promise<any>[] = [];

  accounts.slice(0, 5000).forEach((accountId: string) => {
    reloginPromises.push(relogin(accountId));
  });

  await Promise.all(reloginPromises).then(async (clients) => {
    await makeMetrics(clients.flat(1), startCheckerTime, 'RELOGIN');
  });
};

const reCheck = async () => {
  const accounts = await getAccountsReCheck();
  if (!accounts.length) {
    return;
  }

  console.log({
    message: '💥 RE-CHECK ITERATION INIT 💥',
    prefix: 'GLOBAL_METRICS',
    accountId: 'GLOBAL_METRICS_RECHECK',
    payload: accounts,
  });

  const startCheckerTime = performance.now();
  const reloginPromises: Promise<any>[] = [];

  accounts.forEach((accountId: string) => {
    reloginPromises.push(recheck(accountId));
  });

  await Promise.all(reloginPromises).then(async (clients) => {
    await makeMetrics(clients.flat(1), startCheckerTime, 'RECHECK');
  });
};

const main = async () => {
  await reLogin();
  // await Promise.all([reCheck(), sleep(60000)]);

  await waitConsole();
  process.exit(1);
};

main();
