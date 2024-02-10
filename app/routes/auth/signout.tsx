import { redirect, ActionArgs } from '@remix-run/cloudflare';
import { getSession, destroySession } from '~/sessions.server';

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  return redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
}
