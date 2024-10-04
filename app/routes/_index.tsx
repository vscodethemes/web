import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import api from "~/clients/api";
import * as s from "~/utils/search-params";
import { SearchResults } from "~/components/search-results";
import { Header } from "~/components/header";
import { SearchInput } from "~/components/search-input";
import { SortByMenu } from "~/components/sort-menu";
import { LanguageMenu } from "~/components/language-menu";
import { ThemeMenu } from "~/components/theme-menu";
import { GithubLink } from "~/components/github-link";
import { sortByValues } from "~/data";
import { getSession, commitSession } from "~/sessions";

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
const maxColorDistance = 100;

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userLanguage = session.get("language");
  const userTheme = session.get("theme");

  const url = new URL(request.url);
  const q = s.string(url.searchParams, "q", "");
  const pageNumber = s.integer(url.searchParams, "page", 1, 1, maxPages);
  const sortBy = s.literal(url.searchParams, "sort", "installs", sortByValues);
  const colorDistance = s.float(url.searchParams, "d", 10, 0, maxColorDistance);
  const language = userLanguage ?? "js";

  let text = "";
  let editorBackground = "";
  const color = colord(q);
  if (color.isValid()) {
    editorBackground = color.alpha(1).toHex();
  } else {
    text = q;
    if (userTheme === "dark") {
      editorBackground = "#1e1e1e";
    } else if (userTheme === "light") {
      editorBackground = "#ffffff";
    }
  }

  const params = {
    text,
    editorBackground,
    colorDistance,
    language,
    pageNumber,
    pageSize,
    sortBy,
    q,
    userTheme,
  };

  const results = await api.searchExtensions(params);

  return json({ results, params });
}

export default function Index() {
  const { results, params } = useLoaderData<typeof loader>();
  return (
    <>
      <Header>
        <SearchInput value={params.q} />
        <SortByMenu value={params.sortBy} />
        <LanguageMenu value={params.language} />
        <ThemeMenu value={params.userTheme ?? "system"} />
        <GithubLink />
      </Header>
      <main className="flex-1">
        <SearchResults extensions={results.extensions} />
      </main>
    </>
  );
}
