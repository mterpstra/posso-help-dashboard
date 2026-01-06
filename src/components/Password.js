import getLang from "../i18n.js";

export const GetPasswordRequirementsText = () => { 
  const user = JSON.parse(localStorage.getItem('zapmanejo_user'));
  const english = "Password is too weak.  It must be contain at "
                + "least 8 characters, one uppercase letter, one "
                + "lowercase letter, one number and one special character.";
  const portuguese = "A senha é muito fraca. Ela deve conter pelo menos 8 "
                   + "caracteres, uma letra maiúscula, uma letra minúscula, "
                   + "um número e um caractere especial.";

  const lang = getLang();
  if (lang === "en-US") {
    return english;
  }
  return portuguese;
}

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
