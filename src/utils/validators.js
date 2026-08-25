/**
 * StriveX Input Validators and Real-Time Form Rules
 */

// Name validation: Letters, spaces, apostrophes, hyphens only. Strictly NO NUMBERS.
export const validateName = (name) => {
  if (!name || !name.trim()) {
    return { isValid: false, message: 'Name is required' };
  }
  const trimmed = name.trim();
  if (/\d/.test(trimmed)) {
    return { isValid: false, message: 'Name cannot contain any numbers' };
  }
  if (!/^[a-zA-Z\s'-]{2,50}$/.test(trimmed)) {
    return { isValid: false, message: 'Please enter a valid full name (2-50 characters)' };
  }
  return { isValid: true, message: '' };
};

// Email validation: RFC compliant standard format
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return { isValid: false, message: 'Email address is required' };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, message: 'Enter a valid email address (e.g. name@domain.com)' };
  }
  return { isValid: true, message: '' };
};

// Phone validation: Sri Lankan formats (07XXXXXXXX, +94XXXXXXXXX, 9 digits without 0) + International numbers
export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return { isValid: false, message: 'Phone number is required' };
  }
  const cleaned = phone.trim().replace(/[\s-]/g, '');

  // Sri Lankan formats:
  // 1. +94 followed by 9 digits (e.g., +94771234567)
  // 2. 0 followed by 9 digits (e.g., 0771234567)
  // 3. 9 digits starting with 7 (e.g., 771234567)
  const isSriLankan = /^(\+94|0)?7[0-9]{8}$/.test(cleaned);

  // International format: 7 to 15 digits with optional leading +
  const isInternational = /^\+?[1-9]\d{6,14}$/.test(cleaned);

  if (isSriLankan) {
    return { isValid: true, message: '', type: 'Sri Lankan Mobile' };
  } else if (isInternational) {
    return { isValid: true, message: '', type: 'International' };
  }

  return {
    isValid: false,
    message: 'Enter a valid Sri Lankan (e.g. 0771234567 / +9477...) or international phone number'
  };
};

// Password Strength Evaluator
export const evaluatePasswordStrength = (password) => {
  if (!password) {
    return { score: 0, label: 'Empty', color: 'var(--text-muted)' };
  }
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { score: 1, label: 'Weak', color: 'var(--color-danger)' };
  if (score === 2) return { score: 2, label: 'Fair', color: 'var(--color-warning)' };
  if (score === 3) return { score: 3, label: 'Good', color: 'var(--color-info)' };
  return { score: 4, label: 'Strong', color: 'var(--color-success)' };
};

// Card Number Validator (Luhn algorithm)
export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s+/g, '');
  if (!cleaned || cleaned.length < 13 || cleaned.length > 19 || !/^\d+$/.test(cleaned)) {
    return { isValid: false, message: 'Enter a valid 16-digit card number' };
  }
  let sum = 0;
  let shouldDouble = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0
    ? { isValid: true, message: '' }
    : { isValid: false, message: 'Invalid card number checksum' };
};

// Expiry Date Validator (MM/YY)
export const validateExpiryDate = (expiry) => {
  if (!expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
    return { isValid: false, message: 'Enter format MM/YY' };
  }
  const [monthStr, yearStr] = expiry.split('/');
  const month = parseInt(monthStr, 10);
  const year = parseInt('20' + yearStr, 10);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { isValid: false, message: 'Card has already expired' };
  }
  return { isValid: true, message: '' };
};

// CVC Validator
export const validateCVC = (cvc) => {
  if (!cvc || !/^\d{3,4}$/.test(cvc)) {
    return { isValid: false, message: 'CVC must be 3 or 4 digits' };
  }
  return { isValid: true, message: '' };
};
