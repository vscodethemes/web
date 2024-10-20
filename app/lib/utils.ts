import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function printDescription(text: string) {
  // The max length of shortDescription is 300 and is cut off after 300 chars, add ellipses.
  if (text.length >= 300) {
    return `${text.slice(0, 297)}...`;
  } else if (/[a-zA-Z0-9]/.test(text.charAt(text.length - 1))) {
    return `${text}.`;
  }

  return text;
}
