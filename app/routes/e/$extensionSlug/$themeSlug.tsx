import type { LoaderArgs, ActionArgs, LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import { json, redirect } from '@remix-run/cloudflare';
import { useLoaderData, useTransition, NavLink, Link, Form } from '@remix-run/react';
import { colord } from 'colord';
import { themeHelpers } from '@vscodethemes/utilities';
import { getQueryParam } from '~/utilities/requests';
import stylesUrl from '~/styles/theme.css';
import kv, { Extension, Theme } from '~/clients/kv';
import api from '~/clients/api';
import { DynamicStylesFunction } from '~/components/DynamicStyles';
import Header from '~/components/Header';
import LanguageSelect from '~/components/LanguageSelect';
import Spacer from '~/components/Spacer';
import ExtensionErrorView from '~/components/ExtensionErrorView';
import UserMenu from '~/components/UserMenu';
import FavoriteButton from '~/components/FavoriteButton';
import { getSession } from '~/sessions.server';
import { User } from '~/types';

type ThemeProps = {
  query: ReturnType<typeof parseQuery>;
  extensionSlug: string;
  themeSlug: string;
  extension: Extension;
  themes: Array<{ slug: string; theme: Theme }>;
  selectedTheme: Theme;
  user?: User;
  isFavorite: boolean;
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

const parseQuery = (request: Request) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const language = getQueryParam(params, 'language') ?? 'javascript';
  return { language };
};

export async function loader({ request, params }: LoaderArgs) {
  const { extensionSlug, themeSlug } = params;

  if (!extensionSlug) {
    throw new Error('Missing extension');
  }
  if (!themeSlug) {
    throw new Error('Missing extension');
  }

  const session = await getSession(request.headers.get('Cookie'));
  const user: User | undefined = session.get('user');

  const query = parseQuery(request);

  const [extensionResult, isFavorite] = await Promise.all([
    kv.getExtension(extensionSlug, query.language),
    user
      ? api.isFavorite(user, extensionSlug, themeSlug).catch((err) => {
          console.error(`Failed to check favorite: ${err}`);
          return false;
        })
      : false,
  ]);

  if (!extensionResult) {
    throw new Response('Not Found', { status: 404 });
  }

  const themeMatch = extensionResult.themes[themeSlug];
  if (!themeMatch) {
    const searchParams = new URLSearchParams();
    if (query.language) {
      searchParams.set('language', query.language);
    }
    const qs = searchParams.toString();
    return redirect(`/e/${extensionSlug}${qs ? `?${qs}` : ''}`);
  }

  const data: ThemeProps = {
    query,
    extensionSlug,
    themeSlug,
    extension: extensionResult.extension,
    selectedTheme: themeMatch.theme,
    themes: Object.entries(extensionResult.themes).map(([slug, { theme }]) => ({ slug, theme })),
    user,
    isFavorite,
  };
  return json(data);
}

export async function action({ request, params, context }: ActionArgs) {
  const { extensionSlug, themeSlug } = params;

  if (!extensionSlug) {
    throw new Error('Missing extension');
  }
  if (!themeSlug) {
    throw new Error('Missing extension');
  }

  const formData = await request.formData();
  const intent = formData.get('intent');

  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');
  // const cache = (caches as any).default;

  console.log('ACTION', intent, user.id, extensionSlug, themeSlug);

  if (intent === 'add') {
    await api.addFavorite(user, extensionSlug, themeSlug);

    // TODO: Set cache for user favorite.
    // (context as any).waitUntil(
    //   cache.put(
    //     `https://vscodethemes.com/users/${user.id}/favorites/${extensionSlug}/${themeSlug}`,
    //     new Response('', { status: 200 }),
    //   ),
    // );
  } else if (intent === 'remove') {
    await api.removeFavorite(user, extensionSlug, themeSlug);

    // TODO: Set cache for user favorite.
    // event.waitUntil(cache.put('/users/1/favorites/:extensionSlug/:themeSlug',  new Response('', { status: 404 })));
  } else {
    throw new Response(`Unsupported intent: ${intent}`, { status: 400 });
  }

  // TODO: Delete favorites cache for user.
  // event.waitUntil(cache.delete('/users/1/favorites'));

  return null;
}

const printDescription = (extension: Extension) => {
  // The max length of shortDescription is 300.
  const text = extension.shortDescription ?? '';
  if (text.length >= 300) {
    return `${text.slice(0, 297)}...`;
  } else if (/[a-zA-Z0-9]/.test(text.charAt(text.length - 1))) {
    return `${text}.`;
  }

  return text;
};

export const meta: MetaFunction = ({ data }) => {
  if (!data) return {};

  const { extension, extensionSlug, themeSlug, query } = data as ThemeProps;
  const title = `${extension.displayName} by ${extension.publisherDisplayName}`;
  const description = printDescription(extension);
  const pageUrl = `https://vscodethemes.com/e/${extensionSlug}/${themeSlug}?language=${query.language}`;
  const imageUrl = `https://vscodethemes.com/e/${extensionSlug}/${themeSlug}.jpg?language=${query.language}`;
  return {
    title,
    description,
    'twitter:card': 'summary_large_image',
    'twitter:creator': '_jschr',
    'twitter:url': pageUrl,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': imageUrl,
  };
};

const dynamicStyle: DynamicStylesFunction<ThemeProps> = ({ data }) => {
  if (!data) return '';

  const { selectedTheme } = data;
  const editorBackground = colord(selectedTheme.editorBackground);

  return `
  :root {
    --color-primary: ${themeHelpers.primaryColor(editorBackground, false)};
    --color-foreground-muted: ${themeHelpers.mutedForegroundColor(editorBackground, false)};
    --color-background: ${themeHelpers.backgroundColor(editorBackground, false)};
    --border-color: ${themeHelpers.borderColor(editorBackground, false)};
    --border-color-muted: ${themeHelpers.mutedBorderColor(editorBackground, false)};
    --color-background-raised: ${themeHelpers.backgroundColor(editorBackground, false)};
    --input-background-active: ${themeHelpers.mutedBorderColor(editorBackground, false)};
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-primary: ${themeHelpers.primaryColor(editorBackground, true)};
      --color-foreground-muted: ${themeHelpers.mutedForegroundColor(editorBackground, true)};
      --color-background: ${themeHelpers.backgroundColor(editorBackground, true)};
      --border-color: ${themeHelpers.borderColor(editorBackground, true)};
      --border-color-muted: ${themeHelpers.mutedBorderColor(editorBackground, true)};
      --color-background-raised: ${themeHelpers.backgroundColor(editorBackground, true)};
      --input-background-active: ${themeHelpers.mutedBorderColor(editorBackground, true)};
    }
  }
  `;
};

export const handle = { dynamicStyle };

export default function ThemeView() {
  const { query, themeSlug, extensionSlug, extension, themes, selectedTheme, user, isFavorite } =
    useLoaderData<typeof loader>();

  const transition = useTransition();
  const formData = transition.submission?.formData;

  const editorBackgroundColor = colord(selectedTheme.editorBackground);
  const logoColor = themeHelpers.primaryColor(editorBackgroundColor);

  return (
    <>
      <Header logoColor={logoColor}>
        <Spacer />
        <LanguageSelect value={query.language} />
        <UserMenu user={user} />
      </Header>
      <main>
        <div className="extension">
          <div className="theme-preview">
            <img
              loading="eager"
              src={`/e/${extensionSlug}/${themeSlug}.svg?language=${query.language}`}
              alt=""
            />
          </div>
          <div className="extension-info">
            <div className="extension-name">
              <h1>{extension.displayName}</h1>
              <h4>by {extension.publisherDisplayName}</h4>
            </div>
            <p className="extension-description">{printDescription(extension)}</p>
            <h6 className="extension-actions-heading">Open With</h6>
            <div className="extension-actions">
              <Link reloadDocument to="open?with=desktop" className="button">
                VS Code
              </Link>
              <Link reloadDocument to="open?with=web" className="button button-secondary">
                VS Code for the Web
              </Link>
              <div className="spacer" />
              <Form method="post">
                {formData ? (
                  <FavoriteButton isFavorite={formData.get('intent') === 'add'} />
                ) : (
                  <FavoriteButton isFavorite={isFavorite} />
                )}
              </Form>
            </div>
          </div>
        </div>
        {themes.length > 1 && (
          <div className="extension-themes">
            <div className="extension-themes-inner">
              {themes.map(({ slug, theme }) => {
                // TODO: Support light and dark mode.
                const primaryColorLight = themeHelpers.primaryColor(
                  colord(theme.editorBackground),
                  false,
                );
                const primaryColorDark = themeHelpers.primaryColor(
                  colord(theme.editorBackground),
                  true,
                );

                return (
                  <NavLink
                    replace
                    key={slug}
                    to={`/e/${extensionSlug}/${slug}?language=${query.language}`}
                    prefetch="intent"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    style={{
                      '--color-background': theme.editorBackground,
                      '--color-primary': primaryColorLight,
                      '--color-primary-dark': primaryColorDark,
                    }}
                  >
                    <div className="theme-preview">
                      <img
                        loading="lazy"
                        key={extensionSlug}
                        src={`/e/${extensionSlug}/${slug}.svg?language=${query.language}`}
                        alt=""
                      />
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export function CatchBoundary() {
  return (
    <>
      <Header />
      <ExtensionErrorView />
    </>
  );
}
