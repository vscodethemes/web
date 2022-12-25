import type { MetaFunction, LoaderArgs, LinksFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData, Link, Form } from '@remix-run/react';
import { colord } from 'colord';
import { themeHelpers } from '@vscodethemes/utilities';
import stylesUrl from '~/styles/favorites.css';
import api, { SearchExtensionsOptions } from '~/clients/api';
import { printDescription } from '~/utilities/extension';
import Header from '~/components/Header';
import LanguageSelect from '~/components/LanguageSelect';
import Pagination from '~/components/Pagination';
import Spacer from '~/components/Spacer';
import ErrorView from '~/components/ErrorView';
import UserMenu from '~/components/UserMenu';
import { getQueryParam, getNumberQuery } from '~/utilities/requests';
import { getSession } from '~/sessions.server';
import { FavoriteExtension, User } from '~/types';

type FavoritesData = {
  query: ReturnType<typeof parseQuery>;
  result?: {
    total: number;
    extensions: FavoriteExtension[];
  };
  user?: User;
};

const pageSize = 36;

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

const parseQuery = (request: Request) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const page = getNumberQuery(params, 'page') ?? 1;
  const language = getQueryParam(params, 'language') ?? 'javascript';

  return {
    language,
    page: Math.max(page, 1),
  };
};

export async function loader({ request }: LoaderArgs) {
  const query = parseQuery(request);
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');

  const searchOptions: SearchExtensionsOptions = {
    maxColorDistance: 10,
    sortBy: 'installs', // TODO: Sort by favorite date.
    sortDirection: 'desc',
    page: query.page,
    pageSize,
  };

  const result = await api.searchFavorites(user, searchOptions);
  const data: FavoritesData = { query, result, user: session.get('user') };

  return json(data);
}

export const meta: MetaFunction = () => {
  return {
    title: 'Favorites',
    description: 'My favorite VS Code themes',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '_jschr',
    'twitter:url': 'https://vscodethemes.com/favorites',
    'twitter:title': 'Favorites',
    'twitter:description': 'My favorite VS Code themes',
    'twitter:image': 'https://vscodethemes.com/thumbnail.jpg',
  };
};

export default function Search() {
  const { query, result, user } = useLoaderData<typeof loader>();
  const extensions = result?.extensions ?? [];

  return (
    <>
      <Header>
        <Form method="get" reloadDocument>
          <Spacer />
          <LanguageSelect value={query.language} />
        </Form>
        <UserMenu user={user} />
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
                <div
                  key={extensionSlug}
                  className="result"
                  style={{
                    '--color-background': theme.editorBackground,
                    '--color-primary': primaryColorLight,
                    '--color-primary-dark': primaryColorDark,
                  }}
                >
                  <Link
                    className="result-theme"
                    to={`/e/${extensionSlug}/${theme.slug}?language=${query.language}`}
                    prefetch="intent"
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
                      <h4>by {extension.publisherDisplayName}</h4>
                    </div>
                    <p className="result-description">{printDescription(extension, 120)}</p>
                    <h6 className="result-actions-heading">Open With</h6>
                    <div className="result-actions">
                      <Link reloadDocument to="open?with=desktop" className="button">
                        VS Code
                      </Link>
                      <Link reloadDocument to="open?with=web" className="button button-secondary">
                        VS Code for the Web
                      </Link>
                    </div>
                    {/* {extension.themes.length > 1 && (
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
                    )} */}
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
          <h1>You don't have any favorites yet.</h1>
          <Link to="/">Try searching for some themes</Link>
        </ErrorView>
      )}
    </>
  );
}
