import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import type {
  LinksFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { getSession, commitSession, handleSessionUpdate } from "~/sessions";
import { cn } from "~/lib/utils";
import { UserThemeScript } from "~/components/user-theme-script";
import { AnalyticsScript } from "~/components/analytics-script";
import { DynamicStyles } from "~/components/dynamic-styles";
import { Header } from "~/components/header";
import { GithubLink } from "~/components/github-link";
import tailwindStyles from "./tailwind.css?inline";

export const links: LinksFunction = () => [];

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userTheme = session.get("theme") ?? "system";
  const userLanguage = session.get("language") ?? "js";

  return json(
    { userTheme, userLanguage },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
}

// This action is used to set the user's language and them preference. This needs to be in the root
// to to prevent adding ?index to the URL when POSTing to /. This is because the root and
// routes/_index.tsx share the same path.
export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  await handleSessionUpdate(session, request);
  return json({}, { headers: { "Set-Cookie": await commitSession(session) } });
}

export default function App() {
  const { userTheme } = useRouteLoaderData<typeof loader>("root") || {};

  return (
    <html lang="en" className={cn(userTheme === "dark" && "dark")}>
      <head>
        <UserThemeScript />
        <AnalyticsScript />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <style suppressHydrationWarning>{tailwindStyles}</style>
        <DynamicStyles />
      </head>
      <body className="min-h-screen flex flex-col">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const { userTheme } = useRouteLoaderData<typeof loader>("root") || {};
  const error = useRouteError();
  console.error(error);

  return (
    <html lang="en" className={cn(userTheme === "dark" && "dark")}>
      <head>
        <UserThemeScript />
        <AnalyticsScript />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <style suppressHydrationWarning>{tailwindStyles}</style>
      </head>
      <body className="min-h-screen flex flex-col">
        <Header>
          <GithubLink />
        </Header>
        <main className="flex-1 px-5 py-10 flex items-center justify-center">
          <h1 className="text-3xl pb-40">
            {isRouteErrorResponse(error)
              ? `${error.status} ${error.statusText}`
              : "Oops! Something went wrong."}
          </h1>
        </main>
        <Scripts />
        {/* TODO: Add analytics */}
      </body>
    </html>
  );
}
