import { sendToMainBot } from './sendToMainBot';

process.on('uncaughtException', async (err) => {
  await sendToMainBot(`**** UNCAUGHT_EXCEPTION ****
Error: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  await sendToMainBot(`**** UNHANDLED_REJECTION ****
Reason: ${reason}
Promise: ${JSON.stringify(promise)}`);
  process.exit(1);
});
