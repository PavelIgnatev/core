import fs from 'fs';
import path from 'path';
import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import { HttpsProxyAgent } from 'https-proxy-agent';

export interface Proxy {
  ip: string;
  port: string;
  login: string;
  password: string;
  url: string;
}

export interface UserProfile {
  title: string;
  image: string | null;
  description: string | null;
}

export interface ValidationResult {
  valid: boolean;
  reason: string | null;
  username?: string;
}

export interface TelegramChatResult {
  success: boolean;
  profile?: UserProfile | null;
  error?: string;
  url?: string;
  username?: string;
  nonExistent?: boolean;
}

const getRandomProxy = (): Proxy => {
  const proxiesFile = path.join(__dirname, 'src/parser/@public/proxys.txt');
  const proxies = fs
    .readFileSync(proxiesFile, 'utf-8')
    .split('\n')
    .filter((line) => line.trim() !== '');

  const randomIndex = Math.floor(Math.random() * proxies.length);
  const proxy = proxies[randomIndex];
  const [ip, port, login, password] = proxy.split(':');

  return {
    ip,
    port,
    login,
    password,
    url: `http://${login}:${password}@${ip}:${port}`,
  };
};

const formatDescription = (description: string | undefined): string => {
  if (!description) return '';

  let formatted = description
    .replace(/\t+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  formatted = formatted.replace(/(\s+)([А-Я])/g, '\n$2');
  formatted = formatted.replace(/([.!?]\s+)([А-Я])/g, '$1\n$2');
  formatted = formatted.replace(/([\s,;])([@#])/g, '\n$2');
  formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '\n$1');

  return formatted
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n');
};

const parseUserProfile = (html: string): UserProfile | null => {
  const $ = cheerio.load(html);
  const userProfile: UserProfile = {
    title: '',
    image: null,
    description: null,
  };

  const userExists =
    !$('.tgme_icon_user').length &&
    !$('.tgme_page_description')
      .text()
      .trim()
      .includes('If you have Telegram, you can contact @');

  if (!userExists) {
    return null;
  }

  userProfile.title = $('.tgme_page_title span').text().trim() || '';
  userProfile.image = $('.tgme_page_photo_image').attr('src') || null;

  const description = $('.tgme_page_description').text().trim();
  userProfile.description = formatDescription(description) || null;

  return userProfile;
};

const validateTelegramLink = (link: string): ValidationResult => {
  if (
    typeof link !== 'string' ||
    !(
      link.startsWith('https://t.me/') ||
      link.startsWith('http://t.me/') ||
      link.startsWith('t.me/')
    )
  ) {
    return {
      valid: false,
      reason: 'Некорректная ссылка: проверьте правильность ввода',
    };
  }

  if (link.includes('+')) {
    return {
      valid: false,
      reason:
        "Некорректная ссылка: содержит символ '+' (потенциально инвайт-ссылка)",
    };
  }

  const match = link.match(/t\.me\/([^\/\?]+)(\/.*)?/);
  if (!match || match[2] !== undefined) {
    return {
      valid: false,
      reason:
        'Некорректная ссылка: содержит дополнительные сегменты после юзернейма',
    };
  }

  return {
    valid: true,
    reason: null,
    username: match[1],
  };
};

const getTelegramChatInfo = async (
  username: string
): Promise<TelegramChatResult> => {
  const url = `https://t.me/${username}`;

  try {
    const proxy = getRandomProxy();
    const httpsAgent = new HttpsProxyAgent(proxy.url);
    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response: AxiosResponse<string> = await axios.get(url, {
        httpsAgent,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          Connection: 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Cache-Control': 'max-age=0',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const profile = parseUserProfile(response.data);

      return {
        success: true,
        profile,
        username,
      };
    } catch (requestError) {
      clearTimeout(timeoutId);
      throw requestError;
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
      url,
      username,
    };
  }
};

export const getUser = async (
  username: string,
  maxRetries = 3
): Promise<TelegramChatResult> => {
  let retries = 0;
  let nonExistenceConfirmations = 0;

  async function attemptCheck(): Promise<TelegramChatResult> {
    try {
      const result = await getTelegramChatInfo(username);

      if (result.success) {
        if (result.profile) {
          return result;
        } else {
          nonExistenceConfirmations++;

          if (nonExistenceConfirmations >= maxRetries) {
            return result;
          }

          retries++;
          if (retries < maxRetries) {
            return attemptCheck();
          } else {
            return result;
          }
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      retries++;
      if (retries < maxRetries) {
        return attemptCheck();
      } else {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
          nonExistent: true,
          username,
        };
      }
    }
  }

  return await attemptCheck();
};

export { validateTelegramLink, parseUserProfile };
