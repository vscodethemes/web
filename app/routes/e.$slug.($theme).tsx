import type {
  MetaFunction,
  LoaderFunctionArgs,
  SerializeFrom,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import api from "~/clients/api";
import { getSession, commitSession, handleSessionUpdate } from "~/sessions";
import * as s from "~/lib/search-params";
import * as t from "~/lib/theme-variables";
import { cn } from "~/lib/utils";
import { Header } from "~/components/header";
import { LanguageMenu } from "~/components/language-menu";
import { ThemeMenu } from "~/components/theme-menu";
import { GithubLink } from "~/components/github-link";
import { SearchPagination } from "~/components/search-pagination";
import { DynamicStylesFunction } from "~/components/dynamic-styles";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { languageValues } from "~/data";

const pageSize = 16;
const maxPages = Number.MAX_SAFE_INTEGER;

export async function loader({ request, params }: LoaderFunctionArgs) {
  const [publisherName, extensionName] = (params.slug ?? "").split(".");
  const themeName = params.theme;

  const session = await getSession(request.headers.get("Cookie"));
  const userLanguage = session.get("language");
  const userTheme = session.get("theme");

  const url = new URL(request.url);
  const pageNumber = s.integer(url.searchParams, "page", 1, 1, maxPages);
  const queryLanguage = s.literal(
    url.searchParams,
    "language",
    "js",
    languageValues
  );

  const language = queryLanguage ?? userLanguage ?? "js";

  let editorBackground = "";
  // TODO: Use Sec-CH-Prefers-Color-Scheme header when available.
  if (userTheme === "dark") {
    editorBackground = "#1e1e1e";
  } else if (userTheme === "light") {
    editorBackground = "#ffffff";
  }

  const searchQuery = {
    publisherName,
    extensionName,
    themeName,
    language,
    editorBackground,
    colorDistance: 100,
    extensionsPageNumber: 1,
    extensionsPageSize: 1,
    themesPageNumber: pageNumber,
    themesPageSize: pageSize,
    userTheme,
  };

  const results = await api.searchExtensions(searchQuery);

  return json({
    results,
    searchQuery,
    userLanguage,
    userTheme,
    ENV: {
      webUrl: process.env.WEB_URL!,
    },
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];

  const extension = data.results.extensions[0];
  if (!extension) {
    return [];
  }

  const theme = extension.theme;
  if (!theme) {
    return [];
  }

  const title = `${extension.displayName} by ${extension.publisherDisplayName}`;
  const url = `${data.ENV.webUrl}/e/${extension.publisherName}.${extension.name}/${theme.name}`;
  const image = `${url}.png?language=${data.searchQuery.language}`;

  return [
    { title: `${title} | VS Code Themes` },
    { name: "description", content: extension.shortDescription },
    { property: "og:title", content: title },
    { property: "og:description", content: extension.shortDescription },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  await handleSessionUpdate(session, request);
  return json({}, { headers: { "Set-Cookie": await commitSession(session) } });
}

const dynamicStyle: DynamicStylesFunction<SerializeFrom<typeof loader>> = ({
  data,
}) => {
  if (!data) return "";

  const extension = data.results.extensions[0];
  const theme = extension.theme!;

  return `
  :root {
    --primary: ${t.hsl(theme.activityBarBadgeBackground)};
    --primary-foreground: ${t.hsl(theme.activityBarBadgeForeground)};
    --secondary: ${t.secondary(theme.editorBackground, false)};
    --input: ${t.hsl(theme.activityBarBadgeBackground)};
    --background: ${t.background(theme.editorBackground, false)};
    --foreground: ${t.foreground(theme.editorBackground, false)};
    --muted-foreground: ${t.mutedForeground(theme.editorBackground, false)};
    --border: ${t.border(theme.editorBackground, false)};
    --popover: ${t.background(theme.editorBackground, false)};
    --popover-foreground: ${t.foreground(theme.editorBackground, false)};
    --accent: ${t.accent(theme.editorBackground, false)};
    --vsct-1: ${t.vsct(theme.editorBackground, false)};
    --vsct-2: ${t.vsct(theme.editorBackground, false)};
    --vsct-3: ${t.vsct(theme.editorBackground, false)};
    --vsct-4: ${t.vsct(theme.editorBackground, false)};
    --vsct-5: ${t.vsct(theme.editorBackground, false)};
    --vsct-primary: ${t.mutedForeground(theme.editorBackground, false)};
    --vsct-foreground: ${t.vsct(theme.editorBackground, false)};
    --progress-from: ${t.hsl(theme.activityBarBadgeBackground)};
    --progress-via: ${t.hsl(theme.activityBarBadgeBackground)};
    --progress-to: ${t.hsl(theme.activityBarBadgeBackground)};
  }

  .dark {
    --primary: ${t.hsl(theme.activityBarBadgeBackground)};
    --primary-foreground: ${t.hsl(theme.activityBarBadgeForeground)};
    --secondary: ${t.secondary(theme.editorBackground, true)};
    --input: ${t.hsl(theme.activityBarBadgeBackground)};
    --background: ${t.background(theme.editorBackground, true)};
    --foreground: ${t.foreground(theme.editorBackground, true)};
    --muted-foreground: ${t.mutedForeground(theme.editorBackground, true)};
    --border: ${t.border(theme.editorBackground, true)};
    --popover: ${t.background(theme.editorBackground, true)};
    --popover-foreground: ${t.foreground(theme.editorBackground, true)};
    --accent: ${t.accent(theme.editorBackground, true)};
    --vsct-1: ${t.vsct(theme.editorBackground, true)};
    --vsct-2: ${t.vsct(theme.editorBackground, true)};
    --vsct-3: ${t.vsct(theme.editorBackground, true)};
    --vsct-4: ${t.vsct(theme.editorBackground, true)};
    --vsct-5: ${t.vsct(theme.editorBackground, true)};
    --vsct-primary: ${t.mutedForeground(theme.editorBackground, true)};
    --vsct-foreground: ${t.vsct(theme.editorBackground, true)};
    --progress-from: ${t.background(theme.editorBackground, true)};
    --progress-via: ${t.hsl(theme.activityBarBadgeBackground)};
    --progress-to: ${t.hsl(theme.editorBackground)};
  }
  `;
};

export const handle = { dynamicStyle };

export default function ExtensionThemeRoute() {
  const { results, searchQuery, userLanguage, userTheme } =
    useLoaderData<typeof loader>();

  const extension = results.extensions[0];
  const theme = extension.theme!;

  return (
    <>
      <Header>
        <LanguageMenu value={userLanguage ?? "js"} />
        <ThemeMenu value={userTheme ?? "system"} />
        <GithubLink />
      </Header>
      <main className="flex-1 pt-24 pb-24 flex justify-center">
        <div className="flex flex-col gap-20 max-w-[1080px]">
          <div className="flex flex-row gap-12">
            <img
              className="aspect-theme w-[540px] rounded-lg shadow-lg border border-accent"
              loading="eager"
              src={theme.url}
              alt=""
            />

            <div className="flex flex-col justify-center gap-8">
              <div>
                <h1 className="text-4xl font-light">{extension.displayName}</h1>
                <h2 className="text-xs">by {extension.publisherDisplayName}</h2>
              </div>
              <p>{extension.shortDescription}</p>
              <div className="flex flex-col gap-1">
                <h5 className="text-[9px] uppercase text-primary tracking-wider">
                  Open With
                </h5>
                <div className="flex flex-row gap-4">
                  <Button className="w-40" size="lg">
                    VS Code
                  </Button>
                  <Button variant="outline" size="lg">
                    VS Code for Web
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {extension.totalThemes > 1 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-4">
                <h2 className="text-2xl font-light">More Themes</h2>
                <Badge variant="secondary">+ {extension.totalThemes - 1}</Badge>
              </div>
              <div className="grid grid-cols-4 gap-8">
                {extension.themes.map((theme, index) => {
                  const slug = `${extension.publisherName}.${extension.name}/${theme.name}`;

                  return (
                    <Link
                      to={`/e/${slug}`}
                      className={cn(
                        "flex aspect-theme rounded-lg shadow-lg border border-accent hover:outline outline-offset-2 outline-2 outline-ring",
                        searchQuery.themeName === theme.name && "outline"
                      )}
                      style={{
                        backgroundColor: theme.editorBackground,
                        "--ring": t.ring(theme.activityBarBadgeBackground),
                      }}
                    >
                      <img
                        key={slug}
                        className="aspect-theme w-[540px] rounded-lg shadow-lg border border-accent"
                        loading={index >= 12 ? "lazy" : "eager"}
                        src={theme.url}
                        alt=""
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          <SearchPagination
            total={extension.totalThemes}
            pageNumber={searchQuery.themesPageNumber}
            pageSize={searchQuery.themesPageSize}
          />
        </div>
      </main>
    </>
  );
}
