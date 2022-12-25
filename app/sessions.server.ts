import {
  createCookie,
  // createCloudflareKVSessionStorage,
  createMemorySessionStorage,
} from '@remix-run/cloudflare';

const sessionCookie = createCookie('session', {
  sameSite: true,
  httpOnly: true,
  secure: true,
});

const { getSession, commitSession, destroySession } = createMemorySessionStorage({
  cookie: sessionCookie,
});

// const { getSession, commitSession, destroySession } = createCloudflareKVSessionStorage({
//   kv: VSCODETHEMES_SESSIONS,
//   cookie: sessionCookie,
// });

export { getSession, commitSession, destroySession };
