/**
 * Robust Real-time Validation Engine
 * Handles Sri Lankan formats, international standards, and strict input integrity.
 */

// Name validation: Only alphabets, spaces, hyphens, apostrophes (NO NUMBERS)
export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, message: 'Name is required' };
  }
  if (name.trim().length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters' };
  }
  // Disallow numbers or arbitrary symbols
  if (/\d/.test(name)) {
    return { isValid: false, message: 'Numbers are not allowed in names' };
  }
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name.trim())) {
    return { isValid: false, message: 'Name contains invalid characters' };
  }
  return { isValid: true, message: '' };
};

// Standard RFC-compliant Email format validation
export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, message: 'Email address is required' };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, message: 'Please enter a valid email address (e.g. name@domain.com)' };
  }
  return { isValid: true, message: '' };
};

/**
 * Phone Number validation:
 * Sri Lankan formats:
 * - 10 digits starting with 0 (e.g., 0771234567, 0711234567)
 * - 9 digits without 0 (e.g., 771234567)
 * - +94 prefix (e.g., +94771234567, +94 77 123 4567)
 * Foreign / International formats:
 * - Standard E.164 format (+ followed by 7 to 15 digits)
 */
export const validatePhoneNumber = (phone) => {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, message: 'Phone number is required' };
  }

  // Remove spaces and hyphens for inspection
  const cleanPhone = phone.replace(/[\s-]/g, '');

  // Sri Lankan Regex checks
  // 1. +94 followed by 9 digits (starts with 7, 1, 2, 3, etc.)
  const slIntlRegex = /^\+94[1-9]\d{8}$/;
  // 2. Local 10 digits starting with 0 (07XXXXXXXX or 01XXXXXXXX, etc.)
  const slLocal10Regex = /^0[1-9]\d{8}$/;
  // 3. Local 9 digits starting without 0 (7XXXXXXXX)
  const slLocal9Regex = /^[1-9]\d{8}$/;

  // General International format: +[country code][number] 8 to 15 total digits
  const intlRegex = /^\+[1-9]\d{7,14}$/;

  if (slIntlRegex.test(cleanPhone) || slLocal10Regex.test(cleanPhone) || slLocal9Regex.test(cleanPhone)) {
    return { isValid: true, message: '', type: 'Sri Lankan' };
  }

  if (intlRegex.test(cleanPhone)) {
    return { isValid: true, message: '', type: 'International' };
  }

  // If numbers only and 8-15 digits
  if (/^\d{8,15}$/.test(cleanPhone)) {
    return { isValid: true, message: '', type: 'Standard' };
  }

  return {
    isValid: false,
    message: 'Enter a valid Sri Lankan (e.g. 0771234567, +94771234567) or international phone number'
  };
};

// Password strength calculation
export const validatePassword = (password) => {
  if (!password || password.length === 0) {
    return { isValid: false, score: 0, message: 'Password is required' };
  }
  let score = 0;
  if (password.length >= 8) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/[0-9]/.test(password)) score += 25;
  if (/[^A-Za-z0-9]/.test(password)) score += 25;

  if (password.length < 8) {
    return { isValid: false, score, message: 'Password must be at least 8 characters' };
  }
  return { isValid: score >= 50, score, message: score < 50 ? 'Add uppercase, numbers, or symbols' : '' };
};

// Card Number Luhn Algorithm check
export const validateCardNumber = (cardNumber) => {
  const clean = cardNumber.replace(/[\s-]/g, '');
  if (!clean || !/^\d{13,19}$/.test(clean)) {
    return { isValid: false, message: 'Card number must be 13-19 digits' };
  }
  let sum = 0;
  let shouldDouble = false;
  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  if (sum % 10 !== 0) {
    return { isValid: false, message: 'Invalid card number' };
  }
  return { isValid: true, message: '' };
};

// Card Expiry validation (MM/YY)
export const validateExpiry = (expiry) => {
  if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry.trim())) {
    return { isValid: false, message: 'Expiry must be MM/YY' };
  }
  const [monthStr, yearStr] = expiry.trim().split('/');
  const month = parseInt(monthStr, 10);
  const year = parseInt('20' + yearStr, 10);
  if (month < 1 || month > 12) {
    return { isValid: false, message: 'Invalid month' };
  }
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { isValid: false, message: 'Card has expired' };
  }
  return { isValid: true, message: '' };
};

// Card CVC validation
export const validateCVC = (cvc) => {
  if (!cvc || !/^\d{3,4}$/.test(cvc.trim())) {
    return { isValid: false, message: 'CVC must be 3 or 4 digits' };
  }
  return { isValid: true, message: '' };
};
