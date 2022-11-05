import type { LoaderArgs } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/cloudflare';

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  searchParams.set('sortBy', 'trendingMonthly');

  return redirect(`/?${searchParams.toString()}`);
}
