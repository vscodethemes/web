import type { LoaderFunction } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/cloudflare';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  searchParams.set('text', searchParams.get('q') ?? '');
  searchParams.delete('q');

  return redirect(`/?${searchParams.toString()}`);
};
