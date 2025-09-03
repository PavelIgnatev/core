import { generateUser } from '../generateUser';

const emailProviders = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'aol.com',
  'icloud.com',
  'mail.com',
  'protonmail.com',
  'yandex.com',
  'mail.ru',
  'zoho.com',
  'fastmail.com',
  'tutanota.com',
  'gmx.com',
  'live.com',
  'msn.com',
  'rediffmail.com',
  'inbox.com',
  'hushmail.com',
  'lycos.com',
  'rocketmail.com',
  'earthlink.net',
  'comcast.net',
  'verizon.net',
  'att.net',
  'sbcglobal.net',
  'charter.net',
  'cox.net',
  'bellsouth.net',
  'roadrunner.com'
];

const separators = ['.', '_', ''];

const randomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const generateEmailFromName = (frozenLegalName?: string): string => {
  let firstName: string = '';
  let lastName: string = '';

  if (frozenLegalName && frozenLegalName.trim()) {
    const nameParts = frozenLegalName.trim().split(/\s+/);
    firstName = nameParts[0]?.toLowerCase() || '';
    lastName = nameParts[1]?.toLowerCase() || '';
  }

  if (!firstName || !lastName) {
    const randomGender = Math.random() < 0.5 ? 'male' : 'female';
    const generatedUser = generateUser(randomGender);
    firstName = generatedUser.firstName.toLowerCase();
    lastName = generatedUser.lastName.toLowerCase();
  }

  const separator = randomElement(separators);
  const provider = randomElement(emailProviders);
  
  const addNumbers = Math.random() < 0.3;
  const numbers = addNumbers ? Math.floor(Math.random() * 99) + 1 : '';
  
  return `${firstName}${separator}${lastName}${numbers}@${provider}`;
};