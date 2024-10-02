import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "VS Code Themes" },
    {
      name: "description",
      content: "Search and preview themes for Visual Studio Code",
    },

    // TODO: Add social meta tags.
    // 'twitter:card': 'summary_large_image',
    // 'twitter:creator': '_jschr',
    // 'twitter:url': 'https://vscodethemes.com',
    // 'twitter:title': 'VS Code Themes',
    // 'twitter:description': 'Search themes for Visual Studio Code',
    // 'twitter:image': 'https://vscodethemes.com/thumbnail.jpg',
  ];
};

export default function Index() {
  return <div>TODO</div>;
}
