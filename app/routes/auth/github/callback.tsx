import { LoaderArgs, redirect } from '@remix-run/cloudflare';
import api from '~/clients/api';
import { getSession, commitSession } from '~/sessions.server';

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const code = searchParams.get('code');

  if (!code) {
    throw new Response(`Missing code`, { status: 400 });
  }

  const user = await api.authorizeGithub(code);

  const session = await getSession(request.headers.get('Cookie'));
  session.set('user', user);

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}
