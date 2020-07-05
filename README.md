[![vscodethemes](frontend/static/logo.png)](https://vscodethemes.com)

[![Build Status](https://travis-ci.org/jschr/vscodethemes.svg?branch=production)](https://travis-ci.org/jschr/vscodethemes)

---

Preview themes from the VSCode marketplace. Check out the [annoucement post](https://hackernoon.com/announcing-vscodethemes-4544f50c2b5b).

**Built with**

- [NextJS](https://github.com/zeit/next.js/)
- [Algolia](https://www.algolia.com/)
- [Emotion](https://emotion.sh/)
- [Sentry](https://sentry.io/)
- [Heroku](https://www.heroku.com/)
- [AWS Lambda](https://aws.amazon.com/lambda/),
  [SQS](https://aws.amazon.com/sqs/) and [SNS](https://aws.amazon.com/sns/)
- [Terraform](https://www.terraform.io/)

## How do I get my theme on VSCodeThemes?

In order for your themes to show up on
[vscodethemes](https://vscodethemes.com) they must:

- Be published to the
  [VSCode Marketplace](https://marketplace.visualstudio.com/search?target=VSCode&category=Themes&sortBy=Downloads)
- Have
  [themes in the contributes field](https://code.visualstudio.com/docs/extensionAPI/extension-points#_contributesthemes)
  of your extension's package.json
- See [theme variables](theme-variables/index.ts) for which GUI and token
  colors are used

If you're not sure why a theme isn't showing up, feel free to
[open an issue](https://github.com/jschr/vscodethemes/issues/new).

Consult the
[VSCode docs](https://code.visualstudio.com/docs/extensions/themes-snippets-colorizers)
for how to build your own theme.

## Want to help?

Suggest new features or contribute to the [existing discussions](https://github.com/jschr/vscodethemes/issues?q=is%3Aissue+is%3Aopen+label%3Adiscussion).
