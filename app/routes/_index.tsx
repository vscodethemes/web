import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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

extend([namesPlugin]);

export const meta: MetaFunction = () => {
  return [
    { title: "VS Code Themes" },
    {
      name: "description",
      content: "Search and preview themes for Visual Studio Code",
    },

    // TODO: Add social meta tags.
    // 'twitter:card': 'summary_large_image',
    // 'twitter:creator': '_jschr',
    // 'twitter:url': 'https://vscodethemes.com',
    // 'twitter:title': 'VS Code Themes',
    // 'twitter:description': 'Search themes for Visual Studio Code',
    // 'twitter:image': 'https://vscodethemes.com/thumbnail.jpg',
  ];
};

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
    editorBackground = color.alpha(1).toHex();
  } else {
    text = q;

    // TODO: Use Sec-CH-Prefers-Color-Scheme header when available.
    if (userTheme === "dark") {
      editorBackground = "#1e1e1e";
      colorDistance = 50;
    } else if (userTheme === "light") {
      editorBackground = "#ffffff";
      colorDistance = 50;
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

  return json({ results, searchQuery, q, userLanguage, userTheme });
}

export default function Index() {
  const { results, searchQuery, q, userLanguage, userTheme } =
    useLoaderData<typeof loader>();
  return (
    <>
      <Header>
        <SearchInput value={q} />
        <SortByMenu value={searchQuery.sortBy} />
        <LanguageMenu value={userLanguage ?? "js"} />
        <ThemeMenu value={userTheme ?? "system"} />
        <GithubLink />
      </Header>
      <main className="flex-1 pb-24">
        <SearchResults extensions={results.extensions} />
        <SearchPagination
          total={results.total}
          pageNumber={searchQuery.extensionsPageNumber}
          pageSize={searchQuery.extensionsPageSize}
        />
      </main>
    </>
  );
}
