// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node";
import { Language } from "~/data";

type SessionData = {
  language: Language;
  theme: "light" | "dark" | "system";
};

type SessionFlashData = {
  error: string;
};

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

export { getSession, commitSession, destroySession };
