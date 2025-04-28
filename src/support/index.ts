import 'dotenv/config';
import './helpers/errors';

import { getAccounts } from './db/accounts';
import { sleep } from './helpers/helpers';
import { makeMetrics } from './helpers/makeMetrics';
import { waitConsole } from './helpers/setConsole.log';
import { checker } from './modules/checker';

const reChecker = async () => {
  const accounts = await getAccounts();
  if (!accounts.length) {
    return;
  }
  console.log({
    message: '💥 CHECKER ITERATION INIT 💥',
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
    await makeMetrics(clients, startCheckerTime);
  });
};

const main = async () => {
  await Promise.all([reChecker(), sleep(60000)]);

  await waitConsole();
  process.exit(1);
};

main();
