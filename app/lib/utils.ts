import { colord } from "colord";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toHsl(value: string) {
  let color = colord(value);
  let { h, s, l } = color.toHsl();
  return `${h} ${s}% ${l}%`;
}
