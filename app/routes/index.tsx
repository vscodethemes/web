import type { MetaFunction, LoaderFunction, LinksFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData, Link, Form, useSearchParams } from '@remix-run/react';
import { colord } from 'colord';
import { themeHelpers } from '@vscodethemes/utilities';
import stylesUrl from '~/styles/search.css';
import api, { SearchExtensionsOptions } from '~/clients/api';
import Header from '~/components/Header';
import SearchInput from '~/components/SearchInput';
import LanguageSelect from '~/components/LanguageSelect';
import SortBySelect from '~/components/SortBySelect';
import Pagination from '~/components/Pagination';
import TypeTabs from '~/components/TypeTabs';
import ErrorView from '~/components/ErrorView';
import { getQueryParam, getNumberQuery, getColorParam, getSortByParam } from '~/utilities/requests';
import { resetColorQuery } from '~/utilities/colorQuery';

type Extension = {
  name: string;
  publisherName: string;
  displayName: string;
  publisherDisplayName: string;
  themes: Array<{ slug: string; editorBackground: string }>;
};

type SearchData = {
  query: ReturnType<typeof parseQuery>;
  result?: {
    total: number;
    extensions: Extension[];
  };
};

const pageSize = 36;

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

const parseQuery = (request: Request) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const text = getQueryParam(params, 'text') ?? '';
  const editorBackground = getColorParam(params, 'editorBackground');
  const activityBarBackground = getColorParam(params, 'activityBarBackground');
  const statusBarBackground = getColorParam(params, 'statusBarBackground');
  const tabActiveBackground = getColorParam(params, 'tabActiveBackground');
  const titleBarActiveBackground = getColorParam(params, 'titleBarActiveBackground');
  const type = getQueryParam(params, 'type');
  const colorDistance = getNumberQuery(params, 'colorDistance') ?? 10;

  const page = getNumberQuery(params, 'page') ?? 1;
  const language = getQueryParam(params, 'language') ?? 'javascript';
  const sortBy = getSortByParam(params, 'sortBy') ?? 'installs';

  return {
    text,
    editorBackground,
    activityBarBackground,
    statusBarBackground,
    tabActiveBackground,
    titleBarActiveBackground,
    language,
    sortBy,
    type,
    colorDistance,
    page: Math.max(page, 1),
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const query = parseQuery(request);

  const searchOptions: SearchExtensionsOptions = {
    text: query.text,
    editorBackground: query.editorBackground,
    activityBarBackground: query.activityBarBackground,
    statusBarBackground: query.statusBarBackground,
    tabActiveBackground: query.tabActiveBackground,
    titleBarActiveBackground: query.titleBarActiveBackground,
    maxColorDistance: query.colorDistance,
    sortBy: query.sortBy,
    sortDirection: query.sortBy === 'relevance' ? 'asc' : 'desc',
    page: query.page,
    pageSize,
  };

  if (query.type === 'dark') {
    searchOptions.editorBackground = '#202020';
    searchOptions.maxColorDistance = 50;
  } else if (query.type === 'light') {
    searchOptions.editorBackground = '#ffffff';
    searchOptions.maxColorDistance = 50;
  }

  const result = await api.searchExtensions(searchOptions);
  const data: SearchData = { query, result };

  return json(data);
};

export const meta: MetaFunction = () => {
  return {
    title: 'VS Code Themes',
    description: 'Search and preview themes for Visual Studio Code',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '_jschr',
    'twitter:url': 'https://beta.vscodethemes.com',
    'twitter:title': 'VS Code Themes',
    'twitter:description': 'Search and preview themes for Visual Studio Code',
    'twitter:image': 'https://beta.vscodethemes.com/thumbnail.jpg',
  };
};

export default function Search() {
  const { query, result } = useLoaderData<SearchData>();
  const [searchParams] = useSearchParams();

  const extensions = result?.extensions ?? [];
  const clearTo = new URLSearchParams(searchParams);
  clearTo.delete('text');
  resetColorQuery(clearTo);

  return (
    <>
      <Header>
        <Form method="get" reloadDocument>
          <SearchInput name="text" value={query.text} />
          <TypeTabs />
          <SortBySelect value={query.sortBy} />
          <LanguageSelect value={query.language} />
        </Form>
      </Header>
      {extensions.length > 0 ? (
        <main>
          <div className="results">
            {extensions.map((extension, index) => {
              const extensionSlug = `${extension.publisherName}.${extension.name}`;
              const theme = extension.themes[0];

              const color = colord(theme.editorBackground);
              const primaryColorLight = themeHelpers.primaryColor(color, false);
              const primaryColorDark = themeHelpers.primaryColor(color, true);

              return (
                <div key={extensionSlug} className="result">
                  <Link
                    to={`/e/${extensionSlug}/${theme.slug}?language=${query.language}`}
                    prefetch="intent"
                    style={{
                      '--color-background': theme.editorBackground,
                      '--color-primary': primaryColorLight,
                      '--color-primary-dark': primaryColorDark,
                    }}
                  >
                    <img
                      key={extensionSlug}
                      loading={index >= 6 ? 'lazy' : 'eager'}
                      src={`/e/${extensionSlug}/${theme.slug}.svg?language=${query.language}`}
                      alt=""
                    />
                  </Link>
                  <div className="result-info">
                    <div className="result-name">
                      <h2>{extension.displayName}</h2>
                      <h3>by {extension.publisherDisplayName}</h3>
                    </div>
                    {extension.themes.length > 1 && (
                      <div className="result-themes">
                        {extension.themes.map((theme) => {
                          // TODO: Support light and dark mode.
                          const borderColor = themeHelpers.mutedBorderColor(
                            colord(theme.editorBackground),
                          );

                          return (
                            <div
                              key={theme.slug}
                              style={{ backgroundColor: theme.editorBackground, borderColor }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {result && (
            <Pagination total={result.total} currentPage={query.page} pageSize={pageSize} />
          )}
        </main>
      ) : (
        <ErrorView>
          <h1>No themes found</h1>
          <Link to={`/?${clearTo.toString()}`}>Try clearing search?</Link>
        </ErrorView>
      )}
    </>
  );
}
