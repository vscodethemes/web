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
  const { extensionSlug } = params;

  if (!extensionSlug) {
    throw new Error('Missing extension');
  }

  const query = parseQuery(request);
  const result = await kv.getExtensionWithTokens(extensionSlug, query.language);
  if (!result) {
    throw new Response('Not Found', { status: 404 });
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
