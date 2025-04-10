import 'dotenv/config';
import './helpers/errors';

import { getAccounts } from './db/accounts';
import { sleep } from './helpers/helpers';
import { makeMetrics } from './helpers/makeMetrics';
import { waitConsole } from './helpers/setConsole.log';
import { starter } from './modules/starter';

const _main = async () => {
  const accounts = await getAccounts();
  if (!accounts.length) {
    return;
  }
  console.log({
    message: '💥 PARSER ITERATION INIT 💥',
    prefix: 'GLOBAL_METRICS',
    accountId: 'GLOBAL_METRICS_PARSER',
    payload: accounts,
  });
  const startParserTime = performance.now();
  const parserPromises: Promise<any>[] = [];
  const parserAccounts: Record<string, number> = {};
  accounts.forEach((accountId: string) => {
    parserPromises.push(starter(accountId, parserAccounts));
  });

  setInterval(() => {
    console.log({
      message: `PARSER ITERATION IN PROGRESS (${Object.keys(parserAccounts).length})`,
      prefix: 'GLOBAL_METRICS',
      accountId: 'GLOBAL_METRICS_PARSER',
      parserAccounts,
    });
  }, 60000);

  await Promise.all(parserPromises).then(async (clients) => {
    await makeMetrics(clients, startParserTime);
  });

  console.log({
    message: '💥 PARSER ITERATION DONE 💥',
    prefix: 'GLOBAL_METRICS',
    accountId: 'GLOBAL_METRICS_PARSER',
    payload: {
      parserAccounts,
    },
  });
};

const main = async () => {
  await Promise.all([_main(), sleep(60000)]);

  await waitConsole();
  process.exit(1);
};

main();
