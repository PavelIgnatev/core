const crypto = require('crypto');

const FIXED_CLIENT_PRIVATE_KEY = '8Mrtu-voc24KqoHfl62dVJkhn8eMVPRg8gXCJyM6GE0';
const FIXED_AUTH_SECRET = 'r7whD9lSHp-qJd6GHrAuiQ';
const mockedHeaders = {
  Encryption: 'salt=cH6izlypcYLJO-PPlTdtVg',
  'Crypto-Key':
    'dh=BE-vZ8Vzt-8NKiAGAjRcpHUmG26uCX1NkZjb71doI6dj-2B59K5NvHj6a6TRgTDhPtZ_thWrJO17wwMWOgxUcOo',
};

const mockedEncryptedPayload = Buffer.from(
  'ddf15231a7d26c0d3e6f33c924747fa24740c30d773dbc6a838108a7da5089a67904230b0b917b989a764046e2275d10f2b38b91bb787ab8f906ba301c63d24177128804db1ee855fbd5e03d94639f6d1bc1bab0cdd5d43cba55efc15780db6c5f78e56b3db5ce8f5dbb199376feb73d72d99d6a18f916d88716233b039d9a169bb1b8978f7c680921ffa846e70614c9db7797c435167374ec40f2cf28df6f97354cb65045d7ebc7302fa576b9e93b5210395b6f56eb86e087aba02a6d401e37ed184e566dc1687c0cb695ca61876a9b104847cc44ca14d15330e1aab0db990a81ac90e88ddfc0d40ef8869fda1ca06bf821f05d1812a3a3915df1865aa1d4ca2674128f4c0e435f08a7365d3c5a9c6f3baa6a4e6119647abc18a4d8527b9839301a07',
  'hex'
);

function base64urlEncode(buffer) {
  return buffer.toString('base64');
}

function base64urlDecode(str) {
  return Buffer.from(str, 'base64');
}

function generateWebPushKeys() {
  const clientPrivateKeyBuffer = Buffer.from(FIXED_CLIENT_PRIVATE_KEY, 'base64');
  const ecdh = crypto.createECDH('prime256v1');
  ecdh.setPrivateKey(clientPrivateKeyBuffer);
  const publicKey = ecdh.getPublicKey();
  return {
    keys: {
      p256dh: base64urlEncode(publicKey),
      auth: FIXED_AUTH_SECRET,
    },
    privateKey: FIXED_CLIENT_PRIVATE_KEY,
  };
}

function decryptPushMessage(encryptedPayload, headers, subscription) {
  const salt = base64urlDecode(headers['Encryption'].split('salt=')[1]);
  const ephemeralPublicKey = base64urlDecode(headers['Crypto-Key'].split('dh=')[1]);
  const clientKeys = generateWebPushKeys();
  const clientPrivateKeyBuffer = Buffer.from(clientKeys.privateKey, 'base64');
  const ecdh = crypto.createECDH('prime256v1');
  ecdh.setPrivateKey(clientPrivateKeyBuffer);
  const sharedSecret = ecdh.computeSecret(ephemeralPublicKey);
  const aesKey = crypto.hkdfSync('sha256', sharedSecret, salt, Buffer.from(subscription.auth), 16);
  const nonce = crypto.hkdfSync('sha256', sharedSecret, salt, Buffer.from(subscription.auth), 12);
  const authTag = encryptedPayload.slice(encryptedPayload.length - 16);
  const ciphertext = encryptedPayload.slice(0, encryptedPayload.length - 16);
  const decipher = crypto.createDecipheriv('aes-128-gcm', aesKey, nonce);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString('utf8');
}

const subscription = {
  p256dh: generateWebPushKeys().keys.p256dh,
  auth: FIXED_AUTH_SECRET,
};

console.log(
  'Decrypted message:',
  decryptPushMessage(mockedEncryptedPayload, mockedHeaders, subscription)
);
