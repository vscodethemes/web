import { redirect } from '@remix-run/cloudflare';
import github from '~/clients/github';

export async function loader() {
  return redirect(github.getAuthorizationUrl('read:user'));
}
