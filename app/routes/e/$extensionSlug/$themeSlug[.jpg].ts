import type { LoaderFunction } from '@remix-run/cloudflare';
import { getQueryParam } from '~/utilities/requests';
import kv from '~/clients/kv';

const parseQuery = (request: Request) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const language = getQueryParam(params, 'language') ?? 'javascript';
  return { language };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { extensionSlug, themeSlug } = params;

  if (!extensionSlug) {
    throw new Error('Missing extension');
  }
  if (!themeSlug) {
    // TODO: Redirect to first theme in extension
    throw new Error('Missing extension');
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

  // TODO: Make S3 bucket an env var.
  const imageUrl = `${EXTENSION_MEDIA_URL}/${extensionSlug}/media/${themeSlug}|${query.language}.jpg?c=${result.extension.updatedAt}`;
  const imageRequest = new Request(imageUrl);

  return fetch(imageRequest, {
    cf: {
      cacheTtl: 60 * 60 * 24 * 7, // Cache for 1 week.
      // TODO: Why isn't this working?
      image: {
        width: 800,
        height: 400,
        format: 'webp',
        quality: 100,
        fit: 'scale-down',
      },
    },
  });
};
