import 'dotenv/config';
import './helpers/errors';

import { getAccountsReLogin } from './db/accounts';
import { makeMetrics } from './helpers/makeMetrics';
import { waitConsole } from './helpers/setConsole.log';
import { relogin } from './modules/relogin';

const reLogin = async () => {
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
    await makeMetrics(clients.flat(1), startCheckerTime);
  });

  await waitConsole();
  process.exit(1);
};

reLogin();
