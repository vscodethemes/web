import {
  json,
  SerializeFrom,
  LoaderFunctionArgs,
  ActionFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession, handleSessionUpdate, commitSession } from "~/sessions";
import { Header } from "~/components/header";
import { ThemeMenu } from "~/components/theme-menu";
import { GithubLink } from "~/components/github-link";
import { DynamicStylesFunction } from "~/components/dynamic-styles";

export const meta: MetaFunction = () => {
  const title = "Analytics | VS Code Themes";
  const description = "Search themes for Visual Studio Code";

  return [{ title }, { name: "description", content: description }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userTheme = session.get("theme") ?? "system";
  return json({ userTheme });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  await handleSessionUpdate(session, request);
  return json({}, { headers: { "Set-Cookie": await commitSession(session) } });
}

const dynamicStyle: DynamicStylesFunction<
  SerializeFrom<typeof loader>
> = () => {
  return `
  .dark {
    --background: 220 25.7% 13.7%;
    --popover: 220 25.7% 13.7%;
    --border: 216.9 26% 19.6%;
    --accent: 216.9 26% 19.6%;
  }
  `;
};

export const handle = { dynamicStyle };

export default function Analytics() {
  const { userTheme } = useLoaderData<typeof loader>();

  return (
    <>
      <Header>
        <ThemeMenu value={userTheme ?? "system"} />
        <GithubLink />
      </Header>
      <main className="flex-1 flex">
        <iframe
          plausible-embed
          src={`https://plausible.vscodethemes.com/share/vscodethemes.com?auth=_0yZ1lziZtxjNkncxEyYN&embed=true&theme=${userTheme}`}
          loading="lazy"
          allowTransparency={true}
          className="w-full flex-1"
        ></iframe>
        <script
          async
          src="https://plausible-analytics-ce-production-e882.up.railway.app/js/embed.host.js"
        ></script>
        <script
          async
          src="https://plausible.vscodethemes.com/js/embed.host.js"
        ></script>
      </main>
    </>
  );
}
