import { LoaderArgs, redirect } from '@remix-run/cloudflare';
import github from '~/clients/github';
import { getSession, commitSession } from '~/sessions.server';

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const code = searchParams.get('code');

  if (!code) {
    throw new Response(`Missing code`, { status: 400 });
  }

  const auth = await github.getAccessToken(code);
  const user = await github.getUser(auth.access_token);

  const session = await getSession(request.headers.get('Cookie'));
  session.set('user', {
    id: user.id,
    login: user.login,
    avatarUrl: user.avatar_url,
  });

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}
