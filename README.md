[![vscodethemes](frontend/static/logo.png)](https://vscodethemes.com)

[![Build Status](https://travis-ci.org/jschr/vscodethemes.svg?branch=production)](https://travis-ci.org/jschr/vscodethemes)

---

Preview themes from the VSCode marketplace.

**Built with**

- [NextJS](https://github.com/zeit/next.js/)
- [Algolia](https://www.algolia.com/)
- [Emotion](https://emotion.sh/)
- [Sentry](https://sentry.io/)
- [Heroku](https://www.heroku.com/)
- [AWS Lambda](https://aws.amazon.com/lambda/),
  [SQS](https://aws.amazon.com/sqs/) and [SNS](https://aws.amazon.com/sns/)
- [Terraform](https://www.terraform.io/)

## How do I get my theme on _vscodethemes_?

In order for your themes to show up on on
[vscodethemes](https://vscodethemes.com) they must:

- Be published to the
  [VSCode Marketplace](https://marketplace.visualstudio.com/search?target=VSCode&category=Themes&sortBy=Downloads)
- Include a
  [public Github in the repository field](https://code.visualstudio.com/docs/extensions/publish-extension#_advanced-usage)
  of your extensions's package.json
- Have
  [themes in the contributes field](https://code.visualstudio.com/docs/extensionAPI/extension-points#_contributesthemes)
  of your extension's package.json
- Theme definitions
  [must be JSON](https://code.visualstudio.com/docs/extensions/themes-snippets-colorizers#_create-a-new-color-theme)
  (not .tmTheme) and define `colors` and `tokenColors` ‒
  [Example](https://github.com/Binaryify/OneDark-Pro/blob/master/themes/OneDark-Pro.json)
- See [theme variables](backend/jobs/utils/themeVariables.ts) for which GUI and token
  colors are used

If you're not sure why a theme isn't showing up, feel free to
[open an issue](https://github.com/jschr/vscodethemes/issues/new).

Consult the
[VSCode docs](https://code.visualstudio.com/docs/extensions/themes-snippets-colorizers)
for how to build your own theme.
