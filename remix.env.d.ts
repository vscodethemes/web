/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

export {};

declare global {
  const INTERNAL_API_URL: string;
  const INTERNAL_API_KEY: string;
  const EXTENSION_MEDIA_URL: string;
  const VSCODETHEMES_EXTENSIONS: KVNamespace;
  const GITHUB_CLIENT_ID: string;
  const GITHUB_CLIENT_SECRET: string;
}

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
