import type { LoaderFunction } from '@remix-run/cloudflare';

export const loader: LoaderFunction = async () => {
  return fetch(`${INTERNAL_API_URL}/sitemap`, {
    headers: {
      'X-API-Key': INTERNAL_API_KEY,
    },
    cf: {
      // Cache search results for 24 hours.
      cacheTtl: 60 * 60 * 24,
      cacheEverything: true,
    },
  });
};
