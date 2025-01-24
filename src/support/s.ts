import { initClient } from './client';

const GramJs = require('../gramjs/tl/api');

const input = require('input');

(async () => {
  const client = await initClient(
    {
      accountId: 'LOGIN_ACCOUNT',
      empty: true,
    },
    (update) => {
      console.log(update);
    },
    () => {}
  );

  if (!client) {
    throw new Error('CLIENT_NOT_INITED');
  }

  await client.start();

  const sendResult = await client.invoke(
    new GramJs.auth.SendCode({
      phoneNumber: '+77058226192',
      apiId: 2040,
      apiHash: 'b18441a1ff607e10a989891a5462e627',
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

  console.log(client.session.getSessionData());
})();
