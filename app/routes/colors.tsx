import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession, handleSessionUpdate, commitSession } from "~/sessions";
import { Header } from "~/components/header";
import { ThemeMenu } from "~/components/theme-menu";
import { GithubLink } from "~/components/github-link";
import {
  ColorsChart,
  ColorsChartProps,
} from "~/components/colors-chart.client";
import api from "~/clients/api";
import * as s from "~/lib/search-params";

export const meta: MetaFunction = () => {
  return [];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userTheme = session.get("theme");

  const url = new URL(request.url);
  const anchor = s.integer(url.searchParams, "anchor", 4, 1, 10);

  const results = await api.getColors({ anchor });

  return json({ colors: results.colors.slice(0, 100), userTheme });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  await handleSessionUpdate(session, request);
  return json({}, { headers: { "Set-Cookie": await commitSession(session) } });
}

export default function Index() {
  const { colors, userTheme } = useLoaderData<typeof loader>();
  let defaultTab: ColorsChartProps["defaultTab"] = "all";
  if (userTheme === "dark") {
    defaultTab = "dark";
  } else if (userTheme === "light") {
    defaultTab = "light";
  }

  return (
    <>
      <Header>
        <ThemeMenu value={userTheme ?? "system"} />
        <GithubLink />
      </Header>
      <main className="flex-1 p-8 pb-24">
        {ColorsChart && <ColorsChart defaultTab={defaultTab} colors={colors} />}
      </main>
    </>
  );
}
