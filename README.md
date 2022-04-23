[![vscodethemes](public/banner.png)](https://vscodethemes.com)

Search and preview themes from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/search?target=VSCode&category=Themes&sortBy=Installs).

This repository contains the source code for [vscodethemes.com](https://vscodethemes.com/), built with [Remix](https://remix.run/) and [Cloudflare Workers](https://workers.cloudflare.com/).

## How it Works

VS Code Themes scans the Visual Studio Marketplace and maintains a searchable database of themes.

In order for a theme to show up on the website:

1. A description must exist in the [extension's manifest](https://code.visualstudio.com/api/references/extension-manifest)
2. Themes must be `.json` (`.tmTheme` files are not supported)

Missing a theme? [Open an issue](https://github.com/vscodethemes/web/issues/new).

## Color Search

You can search for themes matching a color using the query string:

- [vscodethemes.com?editorBackground=hex|142A44](https://vscodethemes.com?editorBackground=hex|142A44)
- [vscodethemes.com?editorBackground=rgb|40,35,75](https://vscodethemes.com?editorBackground=rgb|40,35,75)
- [vscodethemes.com?editorBackground=hsl|20,50,10](https://vscodethemes.com/?editorBackground=hsl|20,50,10)

For a full list of supported color formats check out the [test suite](./app/utilities/colorQuery.test.ts).

## Creating a Theme

Here are some helpful links if you'd like to create your own theme:

- [Color Themes, VS Code docs](https://code.visualstudio.com/docs/getstarted/themes)
- [Creating a VS Code Theme by Sarah Drasner, CSS-Tricks](https://css-tricks.com/creating-a-vs-code-theme/)

## Contributing

Development requires access to private packages. If you're interested in contributing let's chat! You're welcome to [open an issue](https://github.com/vscodethemes/web/issues/new) or send an email to [hello@jschr.io](mailto:hello@jschr.io?subject=Contributing%20to%20VS%20Code%20Themes).

## History

Helping you discover new themes since 2018:

- **Version 1**: February 2018 ([Reddit](https://www.reddit.com/r/vscode/comments/7y79e4/preview_vscode_themes_before_installing_them/))
- **Version 2**: July 2018 ([Medium](https://hackernoon.com/announcing-vscodethemes-4544f50c2b5b))
- **Version 3**: April 2022
