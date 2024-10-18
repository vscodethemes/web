import { json, MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import api from "~/clients/api";
import * as s from "~/lib/search-params";
import { SearchResults } from "~/components/search-results";
import { Header } from "~/components/header";
import { SearchInput } from "~/components/search-input";
import { SortByMenu } from "~/components/sort-menu";
import { LanguageMenu } from "~/components/language-menu";
import { ThemeMenu } from "~/components/theme-menu";
import { GithubLink } from "~/components/github-link";
import { SearchPagination } from "~/components/search-pagination";
import { sortByValues } from "~/data";
import { getSession } from "~/sessions";
import { cn } from "~/lib/utils";

extend([namesPlugin]);

const pageSize = 36;
const maxPages = Number.MAX_SAFE_INTEGER;

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userLanguage = session.get("language");
  const userTheme = session.get("theme");

  const url = new URL(request.url);
  const q = s.string(url.searchParams, "q", "");
  const pageNumber = s.integer(url.searchParams, "page", 1, 1, maxPages);
  const sortBy = s.literal(url.searchParams, "sort", "installs", sortByValues);
  const language = userLanguage ?? "js";

  let text = "";
  let editorBackground = "";
  let colorDistance = 10;
  const color = colord(q);
  if (color.isValid()) {
    const { l } = color.toHsl();

    // There is a high concentration of white themes so the closer the color is to white,
    // the smaller the color distance.
    colorDistance = Math.min(Math.max(100 - l, 5), 10);

    editorBackground = color.alpha(1).toHex();
  } else {
    text = q;

    if (userTheme === "dark") {
      editorBackground = "#1e1e1e";
      colorDistance = 50;
    } else if (userTheme === "light") {
      editorBackground = "#ffffff";
      colorDistance = 50;
    } else {
      const clientHint = request.headers.get("Sec-CH-Prefers-Color-Scheme");
      if (clientHint === "dark") {
        editorBackground = "#1e1e1e";
        colorDistance = 50;
      } else if (clientHint === "light") {
        editorBackground = "#ffffff";
        colorDistance = 50;
      }
    }
  }

  const searchQuery = {
    text,
    editorBackground,
    language,
    sortBy,
    colorDistance,
    extensionsPageNumber: pageNumber,
    extensionsPageSize: pageSize,
    // Only return first 10 themes.
    themesPageNumber: 1,
    themesPageSize: 10,
  };

  const results = await api.searchExtensions(searchQuery);

  return json({
    results,
    searchQuery,
    q,
    userLanguage,
    userTheme,
    ENV: {
      webUrl: process.env.WEB_URL!,
    },
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];

  const title = "VS Code Themes";
  const description = "Search themes for Visual Studio Code";
  const url = data.ENV.webUrl;
  const image = `${url}/thumbnail.jpg`;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: "VS Code Themes" },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
  ];
};

export default function Index() {
  const { results, searchQuery, q, userTheme } = useLoaderData<typeof loader>();

  const hasResults = results.extensions.length > 0;

  return (
    <>
      <Header>
        <SearchInput value={q} />
        <SortByMenu value={searchQuery.sortBy} />
        <LanguageMenu value={searchQuery.language} />
        <ThemeMenu value={userTheme ?? "system"} />
        <GithubLink />
      </Header>
      <main
        className={cn(
          "flex-1 pb-12 md:pb-24",
          !hasResults && "py-10 pb-40 flex items-center justify-center"
        )}
      >
        {hasResults ? (
          <>
            <SearchResults extensions={results.extensions} />
            <SearchPagination
              total={results.total}
              pageNumber={searchQuery.extensionsPageNumber}
              pageSize={searchQuery.extensionsPageSize}
            />
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl">No themes found</h1>
            <Link className="text-sm text-vsct-1 hover:underline" to={`/`}>
              Try clearing search?
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
