export const printDescription = (
  extension: { shortDescription: string | null },
  maxLength = 300,
) => {
  // The max length of shortDescription is 300.
  const text = extension.shortDescription ?? '';
  if (text.length >= maxLength) {
    return `${text.slice(0, maxLength - 3)}...`;
  } else if (/[a-zA-Z0-9]/.test(text.charAt(text.length - 1))) {
    return `${text}.`;
  }

  return text;
};
