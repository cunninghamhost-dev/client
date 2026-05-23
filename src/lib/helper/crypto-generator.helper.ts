import crypto from 'crypto';
import { formatDateDDMMYY } from './string-manipulator.helper';

export const generateRandomCode = (length = 6): string => {
  let result = '';
  const SAFE_BASE32_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const bytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    // Map byte value (0-255) into 0-31
    const index = bytes[i] % SAFE_BASE32_ALPHABET.length;
    result += SAFE_BASE32_ALPHABET[index];
  }

  return result;
};

export function generateReference(): string {
  const today = new Date();
  const datePart = formatDateDDMMYY(today);
  const randomPart = generateRandomCode(6);

  return `CGT-${datePart}-${randomPart}`;
}

export const generateOTP = () => {
  return crypto.randomInt(100000 + Math.random() * 999999).toString();
};

export function hashGeneratedOTP(otp: string): string {
  return crypto.createHash('sha256').update(otp).digest('hex');
}
