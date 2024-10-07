import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
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
import { DynamicStyles } from "~/components/dynamic-styles";
import tailwindStyles from "./tailwind.css?inline";

export const links: LinksFunction = () => [];

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userTheme = session.get("theme") ?? "system";

  return json(
    { userTheme },
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

export function Layout({ children }: { children: React.ReactNode }) {
  const { userTheme } = useRouteLoaderData<typeof loader>("root") || {};
  return (
    <html lang="en" className={cn(userTheme === "dark" && "dark")}>
      <head>
        <UserThemeScript />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <style>{tailwindStyles}</style>
        <DynamicStyles />
      </head>
      <body className="flex flex-col">
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* TODO: Add analytics */}
        {/* <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "170a147d58824cf485cb425f9770c269"}'
        ></script> */}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
