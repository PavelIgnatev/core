const { sessions, TelegramClient } = require('./gramjs');
const GramJs = require('./gramjs/tl/api');
const input = require('input'); // npm i input

(async () => {

  const session = new sessions.CallbackSession(undefined, (d) =>
    console.log(d)
  );

  const client = new TelegramClient(
    session,
    2496,
    '8da85b0d5bfe62527e5b244c209159c3',
    {
      deviceModel:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 YaBrowser/24.12.0.0 Safari/537.36',
      systemVersion: 'macOS',
      appVersion: '10.9.17 A',
      useWSS: true,
      additionalDcsDisabled: false,
      shouldAllowHttpTransport: true,
      testServers: false,
      langCode: 'en',
    }
  );

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

  const phoneCode = await input.text('Please enter your password: ');

  const result = await client.invoke(
    new GramJs.auth.SignIn({
      phoneNumber: '+77058226192',
      phoneCodeHash,
      phoneCode,
    })
  );
  console.log(result);

  console.log(session.getSessionData());
  await client.destroy();
})();
