import { useTranslation } from 'react-i18next';

export const IsValidPassword = (password) => {
  // Check minimum length
  if (password.length < 8) {
    return false;
  }
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }
  // Check for at least one number
  if (!/\d/.test(password)) {
    return false;
  }
  // Check for at least one special character
  if (!/[!@#$%^&*]/.test(password)) {
    return false;
  }
  // If all criteria are met
  return true;
}
