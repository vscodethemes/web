// app/sessions.ts
import { createCookieSessionStorage, Session } from "@remix-run/node";
import { Language, languageValues } from "~/data";

export interface SessionData {
  language: Language;
  theme: "light" | "dark" | "system";
}

export interface SessionFlashData {
  error: string;
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      // domain: "TODO",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
      sameSite: "lax",
      // secrets: ["TODO"],
      secure: true,
    },
  });

export async function handleSessionUpdate(
  session: Session<SessionData, SessionFlashData>,
  request: Request
) {
  const form = await request.formData();
  const userLanguage = form.get("language");
  const userTheme = form.get("theme");

  if (
    userLanguage !== null &&
    (languageValues as string[]).includes(userLanguage.toString())
  ) {
    session.set("language", userLanguage.toString() as Language);
  }

  if (
    userTheme !== null &&
    ["light", "dark", "system"].includes(userTheme.toString())
  ) {
    session.set("theme", userTheme.toString() as "light" | "dark" | "system");
  }
}

export { getSession, commitSession, destroySession };
