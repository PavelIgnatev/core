import { sendToMainBot } from './sendToMainBot';
import { waitConsole } from './setConsole.log';

process.on('uncaughtException', async (err) => {
  await waitConsole();
  await sendToMainBot(`**** UNCAUGHT_EXCEPTION ****
Error: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  await waitConsole();
  await sendToMainBot(`**** UNHANDLED_REJECTION ****
Reason: ${reason}
Promise: ${JSON.stringify(promise)}`);
  process.exit(1);
});
