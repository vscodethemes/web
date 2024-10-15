import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Session } from "@remix-run/node";
import { SessionData, SessionFlashData } from "~/sessions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
