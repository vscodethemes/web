import type { MetaFunction, LinksFunction } from '@remix-run/cloudflare';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import Footer from '~/components/Footer';
import DynamicStyles from '~/components/DynamicStyles';
import globalStyles from '~/styles/global.css';
import darkStyles from '~/styles/dark.css';
import componentStyles from '~/styles/components.css';

export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalStyles },
    { rel: 'stylesheet', href: darkStyles, media: '(prefers-color-scheme: dark)' },
    { rel: 'stylesheet', href: componentStyles },
  ];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'VS Code Themes',
  description: 'Search themes for Visual Studio Code',
  'twitter:card': 'summary_large_image',
  'twitter:creator': '_jschr',
  'twitter:url': 'https://vscodethemes.com',
  'twitter:title': 'VS Code Themes',
  'twitter:description': 'Search themes for Visual Studio Code',
  'twitter:image': 'https://vscodethemes.com/thumbnail.jpg',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <DynamicStyles />
      </head>
      <body>
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "170a147d58824cf485cb425f9770c269"}'
        ></script>
        <LiveReload />
      </body>
    </html>
  );
}
