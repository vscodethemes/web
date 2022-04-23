import type { LoaderFunction } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/cloudflare';
import { getQueryParam } from '~/utilities/requests';
import kv from '~/clients/kv';

const parseQuery = (request: Request) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const target = getQueryParam(params, 'with') ?? 'desktop';
  return { target };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { extensionSlug, themeSlug } = params;

  if (!extensionSlug) {
    throw new Error('Missing extension');
  }
  if (!themeSlug) {
    throw new Error('Missing theme');
  }

  const query = parseQuery(request);
  const result = await kv.getExtension(extensionSlug, 'javascript');
  if (!result) {
    throw new Response('Not Found', { status: 404 });
  }

  const themeMatch = result.themes[themeSlug];
  if (!themeMatch) {
    throw new Response('Not Found', { status: 404 });
  }

  const publisherName = result.extension.publisherName;
  const extensionName = result.extension.name;
  const themeName = themeMatch.theme.displayName;

  if (query.target === 'desktop') {
    return redirect(`vscode:extension/${publisherName}.${extensionName}`);
  } else {
    return redirect(
      `https://vscode.dev/theme/${publisherName}.${extensionName}/${encodeURIComponent(themeName)}`,
    );
  }
};
