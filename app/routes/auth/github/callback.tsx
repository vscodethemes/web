import { LoaderArgs, json } from '@remix-run/cloudflare';
import github from '~/clients/github';

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const code = searchParams.get('code');

  if (!code) {
    throw new Response(`Missing code`, { status: 400 });
  }

  const auth = await github.getAccessToken(code);
  const user = await github.getUser(auth.access_token);

  // TODO: Create session cookie.

  return json({ auth, user });
}
