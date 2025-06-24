import { LANGUAGE_TO_FLAG } from "../constants/index.js";

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

export function getLanguageFlagUrl(language) {
  if (!language) return null;
  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];
  return countryCode ? `https://flagcdn.com/24x18/${countryCode}.png` : null;
}
