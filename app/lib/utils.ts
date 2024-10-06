import { colord } from "colord";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toHsl(value: string, minLightness = 20, maxLightness = 80) {
  let color = colord(value);
  let { h, s, l } = color.toHsl();

  l = Math.max(minLightness, Math.min(l, maxLightness));

  return `${h} ${s}% ${l}%`;
}
