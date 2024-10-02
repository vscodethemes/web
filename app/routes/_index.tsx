import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import api from "~/clients/api";
import * as s from "~/utils/searchParams";

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

const languageValues = [
  "cpp",
  "css",
  "go",
  "html",
  "java",
  "js",
  "php",
  "py",
] as const;

const sortByValues = [
  "relevance",
  "installs",
  "trending_daily",
  "trending_weekly",
  "trending_monthly",
  "rating",
  "updated_at",
] as const;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = s.string(url.searchParams, "q", "");
  const pageNumber = s.integer(url.searchParams, "page", 1, 1, maxPages);
  const language = s.literal(url.searchParams, "l", "js", languageValues);
  const sortBy = s.literal(url.searchParams, "sort", "installs", sortByValues);
  const colorDistance = s.float(url.searchParams, "d", 10, 0, maxColorDistance);

  let text = "";
  let editorBackground = "";
  const color = colord(q);
  if (color.isValid()) {
    editorBackground = color.alpha(1).toHex();
  } else {
    text = q;
  }

  console.log({ text, editorBackground });

  const results = await api.searchExtensions({
    text,
    editorBackground,
    colorDistance,
    language,
    pageNumber,
    pageSize,
    sortBy,
  });

  return json({ results });
};

export default function Index() {
  const { results } = useLoaderData<typeof loader>();
  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      {results.extensions.map((extension) => (
        <img
          key={`${extension.publisherName}/${extension.name}`}
          src={extension.themes[0].url}
          alt={`${extension.publisherName}/${extension.name}`}
        />
      ))}
    </div>
  );
}
