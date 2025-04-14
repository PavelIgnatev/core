import 'dotenv/config';
import './helpers/errors';

import { sleep } from './helpers/helpers';
import { makeMetrics } from './helpers/makeMetrics';
import { sendToMainBot } from './helpers/sendToMainBot';
import { waitConsole } from './helpers/setConsole.log';
import { starter } from './modules/starter';

const _main = async () => {
  const id = process.env.ID;

  if (!id) {
    await sendToMainBot('ID NOT FOUND');
    await sleep(60000);
    return;
  }

  console.log({
    message: `💥 PARSER_${id}_INIT 💥`,
    prefix: 'GLOBAL_METRICS_PARSER',
    payload: { id },
  });

  const startParserTime = performance.now();
  const account = await starter(id);

  await makeMetrics([account], startParserTime);

  console.log({
    message: `💥 PARSER_${id}_DONE 💥`,
    prefix: 'GLOBAL_METRICS_PARSER',
  });
};

const main = async () => {
  await Promise.all([_main(), sleep(60000)]);

  await waitConsole();
  process.exit(1);
};

main();
