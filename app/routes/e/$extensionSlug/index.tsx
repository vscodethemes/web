import type { LoaderArgs } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/cloudflare';
import { getQueryParam } from '~/utilities/requests';
import kv from '~/clients/kv';
import Header from '~/components/Header';
import ExtensionErrorView from '~/components/ExtensionErrorView';

const parseQuery = (request: Request) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const language = getQueryParam(params, 'language');
  return { language };
};

export async function loader({ request, params }: LoaderArgs) {
  const { extensionSlug } = params;

  if (!extensionSlug) {
    throw new Error('Missing extension');
  }

  const query = parseQuery(request);
  const result = await kv.getExtension(extensionSlug, query.language ?? 'javascript');
  if (!result) {
    throw new Response('Not Found', { status: 404 });
  }

  const firstTheme = Object.keys(result.themes)[0];
  const searhParams = new URLSearchParams();
  if (query.language) {
    searhParams.set('language', query.language);
  }
  const qs = searhParams.toString();

  return redirect(`/e/${extensionSlug}/${firstTheme}${qs ? `?${qs}` : ''}`);
}

// An empty component is Needed for CatchBoundary to be called.
export default function ExtensionView() {
  return null;
}

export function CatchBoundary() {
  return (
    <>
      <Header />
      <ExtensionErrorView />
    </>
  );
}
