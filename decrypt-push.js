const crypto = require('crypto');
const hkdf = require('futoin-hkdf');

// Функция для декодирования base64url в Buffer
function base64urlDecode(str) {
  // Заменяем символы '-' на '+' и '_' на '/'
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  // Добиваем '=' до кратности 4
  while (str.length % 4) {
    str += '=';
  }
  return Buffer.from(str, 'base64');
}

/*
  Заданные данные:

  1. Клиентский закрытый ключ, который был сгенерирован при регистрации push‑подписки.
     (из вашего лога: "SnU5JzY8bk55erEMFFxk85uhPUIsIINpqsWMbNFY-FE")
  
  2. Auth‑секрет подписки (из объекта подписки):
     "csy47sLK1cst9sxmJCQGow"
  
  3. Заголовок encryption: соль
     "salt=XAX5k6Q0hQsL0Q26nA0D7g" → берём значение "XAX5k6Q0hQsL0Q26nA0D7g"
  
  4. Заголовок crypto‑key: эфемерный публичный ключ отправителя:
     "dh=BAJrl8QlrvDg4JkDHoYibfM4EW9l25TJeNjC0i5O9y_CRWfhemA3ymHbyh97GwRSi17PiK_jpbJ40Ps8SCdMeoY"
  
  5. Зашифрованное сообщение (данные) в hex-формате.
*/
const clientPrivateKeyB64Url = "FE1nUjM5cav8M0NnbgBG4P29tue7oGgeR-b-gCcL-0Q";
const authSecretB64Url = "s9BVG784VbrIKvKXv7vbOw";
const saltB64Url = "Wu9TsmSUQIn0-ufiLjXThQ";
const ephemeralPublicKeyB64Url = "BGty1aNvGSDdVvAMN7o7SWO39VECAGinK-bAfFYatyHN_JMP_7r6iv8407dTvgW3zkfy2i7TTnQEmRTRUZirxq4";

// Зашифрованное сообщение (hex-строка)
const ciphertextHex = "f7cda1b8edf1b193383afbc82555064644812949296d358a1c9c634d9db62a90ed71d41034cc8c144ae99f431ab8df0a1d47c93db9d2c2b483b87513c8ed6cb6e3ea63a278b1a5148088aec03611868b489ac2eb2dc62e4aa67b888d7ba97f1165a7deb3e85e4f57219ce5308df381d41104688473da3a69cd81cdad0a62665578e0031279bc72db61dd56fdd6a30f2cfef09daf1d7d899f45ade4ba02c9b1d94e8d3de8db40bdb909f4fcdb7d924d77243e34551c2b0f20969a8a2da78658498345b3971095ebf924c58eaa92cbe7083c72f407068131d714c06316809155f149ad5f53ae2fe577b8004659f3f05aec66981c8c91ce95509f25f88e33962c673c3b60e9c1128a3bd770121f4d93a4b1d5a465774f396f66d3c1a80ba98de5bbf7d210b1";

// Декодируем входные данные
const clientPrivateKey = base64urlDecode(clientPrivateKeyB64Url);
const authSecret = base64urlDecode(authSecretB64Url);
const salt = base64urlDecode(saltB64Url);
const ephemeralPublicKey = base64urlDecode(ephemeralPublicKeyB64Url);

console.log("Клиентский закрытый ключ (hex):", clientPrivateKey.toString('hex'));
console.log("Auth Secret (hex):", authSecret.toString('hex'));
console.log("Соль (salt) (hex):", salt.toString('hex'));
console.log("Эфемерный публичный ключ (hex):", ephemeralPublicKey.toString('hex'));

// === Шаг 1: Вычисляем общий секрет (ECDH) ===
const ecdh = crypto.createECDH('prime256v1');
ecdh.setPrivateKey(clientPrivateKey);
const sharedSecret = ecdh.computeSecret(ephemeralPublicKey);
console.log("Общий секрет (Shared Secret, hex):", sharedSecret.toString('hex'));

// === Шаг 2: HKDF-Extract для получения PRK ===
// Согласно спецификации Web Push: PRK = HKDF-Extract(salt = authSecret, IKM = sharedSecret)
const prk = hkdf(sharedSecret, 32, { salt: authSecret, info: '', hash: 'SHA-256' });
console.log("PRK (hex):", prk.toString('hex'));

// === Шаг 3: HKDF-Expand для получения CEK и Nonce ===
// Вывод CEK (Content Encryption Key)
// info = "Content-Encoding: aesgcm" с завершающим нулевым байтом; длина CEK = 16 байт
const cekInfo = Buffer.from("Content-Encoding: aesgcm\0", "utf8");
const cek = hkdf(prk, 16, { salt: salt, info: cekInfo, hash: 'SHA-256' });
console.log("CEK (hex):", cek.toString('hex'));

// Вывод Nonce (инициализационный вектор для AES-GCM)
// info = "Content-Encoding: nonce" с завершающим нулевым байтом; длина Nonce = 12 байт
const nonceInfo = Buffer.from("Content-Encoding: nonce\0", "utf8");
const nonce = hkdf(prk, 12, { salt: salt, info: nonceInfo, hash: 'SHA-256' });
console.log("Nonce (hex):", nonce.toString('hex'));

// === Шаг 4: Подготавливаем зашифрованное сообщение ===
const ciphertextBuffer = Buffer.from(ciphertextHex, "hex");
// В режиме AES-GCM последние 16 байт — это аутентификационный тег (auth tag)
const authTag = ciphertextBuffer.slice(ciphertextBuffer.length - 16);
const encryptedContent = ciphertextBuffer.slice(0, ciphertextBuffer.length - 16);

console.log("Зашифрованное содержимое (hex):", encryptedContent.toString("hex"));
console.log("Аутентификационный тег (Auth Tag, hex):", authTag.toString("hex"));

try {
    const decipher = crypto.createDecipheriv("aes-128-gcm", cek, nonce);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedContent);
    const finalChunk = decipher.final(); // Вызываем один раз
    decrypted = Buffer.concat([decrypted, finalChunk]);
    console.log("Расшифрованное сообщение:", decrypted.toString("utf8"));
  } catch (err) {
    console.error("Ошибка при расшифровке:", err);
  }
  