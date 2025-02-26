export const generateCustomString = (length = 16) => {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  let result = letters.charAt(Math.floor(Math.random() * letters.length));

  const digitPosition = Math.floor(Math.random() * (length - 1)) + 1;
  const randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));

  for (let i = 1; i < length; i++) {
    if (i === digitPosition) {
      result += randomDigit;
    } else {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
  }

  return result;
};
