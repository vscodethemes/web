import type { LoaderArgs } from '@remix-run/cloudflare';
import { renderers } from '@vscodethemes/utilities';
import { getQueryParam } from '~/utilities/requests';
import kv from '~/clients/kv';

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
    throw new Error('Missing theme');
  }

  const query = parseQuery(request);
  const result = await kv.getExtensionWithTokens(extensionSlug, query.language);
  if (!result) {
    throw new Response('Not Found', { status: 404 });
  }

  const themeMatch = result.themes[themeSlug];
  if (!themeMatch) {
    throw new Response('Not Found', { status: 404 });
  }

  const svg = renderers.renderThemePreviewSvg({
    theme: themeMatch.theme,
    tokens: themeMatch.tokens,
    language: query.language,
    rounded: true,
  });

  return new Response(JSON.stringify(themeMatch), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
