// npm i input
import TelegramClient from '../gramjs/client/TelegramClient';
import CallbackSession from '../gramjs/sessions/CallbackSession';

const GramJs = require('../gramjs/tl/api');

const input = require('input');

(async () => {
  const session = new CallbackSession(undefined, () => {});
  const client = new TelegramClient(session, 'REGISTER_ACCOUNT', () => {});

  if (!client) {
    throw new Error('CLIENT_NOT_INITED');
  }

  await client.start();

  const sendResult = await client.invoke(
    new GramJs.auth.SendCode({
      phoneNumber: '+77058226192',
      apiId: 2496,
      apiHash: '8da85b0d5bfe62527e5b244c209159c3',
      settings: new GramJs.CodeSettings(),
    })
  );

  if (!(sendResult instanceof GramJs.auth.SentCode)) {
    throw Error('Unexpected SentCodeSuccess');
  }

  if (!(sendResult.type instanceof GramJs.auth.SentCodeTypeApp)) {
    throw Error('Unexpected SentCodeSuccess');
  }

  const { phoneCodeHash } = sendResult;

  if (typeof phoneCodeHash !== 'string') {
    throw new Error('Failed to retrieve phone code hash');
  }

  const phoneCode = await input.text('Please enter your code: ');

  const result = await client.invoke(
    new GramJs.auth.SignIn({
      phoneNumber: '+77058226192',
      phoneCodeHash,
      phoneCode,
    })
  );
  console.log(result);

  console.log(session.getSessionData());
})();
