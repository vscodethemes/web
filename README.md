[![vscodethemes](frontend/assets/logo.png)](https://vscodethemes.com)

[![Build Status](https://travis-ci.org/jschr/vscodethemes.svg?branch=production)](https://travis-ci.org/jschr/vscodethemes)
[![Dependencies](https://david-dm.org/jschr/vscodethemes.svg)](https://david-dm.org/jschr/vscodethemes)

---

Preview themes from the VSCode marketplace.

**Built with**

* [AWS Lambda](https://aws.amazon.com/lambda/),
  [SQS](https://aws.amazon.com/sqs/) and [SNS](https://aws.amazon.com/sns/)
* [Terraform](https://www.terraform.io/)
* [Algolia](https://www.algolia.com/)
* [React](https://reactjs.org/) and
  [Syntax Highlighter](https://github.com/conorhastings/react-syntax-highlighter)
* [Webpack](https://webpack.js.org/) and
  [Static Site Generator Plugin](https://github.com/markdalgleish/static-site-generator-webpack-plugin)

[How do I get my theme on _vscodethemes_?](#how-do-i-get-my-theme-on-vscodethemes)

## How it works

[TODO]

### Draining the SQS queues

[TODO]

### Error handling and retries

[TODO]

### Pre-rendering the frontend

[TODO]

### Sharing runtime and static types

[TODO]

### Continuous deployment with Terraform

[TODO]

#### Gotchas

We're using Terraform's count parameter to
[conditionally create policies, sns triggers and cloudwatch subscriptions](infrastructure/modules/backend/lambda/lambda.tf#L42)
for our lambdas. Since
[count cannot be a computed value](https://github.com/hashicorp/terraform/issues/12570),
this creates a scenario where when we create (or rename) a lambda we need to
deploy twice. Once to create the required sns topics, sqs queues and cloudwatch
events to create the dependent resources and than a second time to create the
lambda function.

## How do I get my theme on _vscodethemes_?

In order for your themes to show up on on
[vscodethemes](https://vscodethemes.com) they must:

* Be published to the
  [VSCode Marketplace](https://marketplace.visualstudio.com/search?target=VSCode&category=Themes&sortBy=Downloads)
* Include a
  [public Github in the repository field](https://code.visualstudio.com/docs/extensions/publish-extension#_advanced-usage)
  of your extensions's package.json
* Have
  [themes in the contributes field](https://code.visualstudio.com/docs/extensionAPI/extension-points#_contributesthemes)
  of your extension's package.json
* Theme definitions
  [must be JSON](https://code.visualstudio.com/docs/extensions/themes-snippets-colorizers#_create-a-new-color-theme)
  (not TextMate) and define `colors` and `tokenColors` ‒
  [Example](https://github.com/Binaryify/OneDark-Pro/blob/master/themes/OneDark-Pro.json)
* See [theme variables](backend/themeVariables.ts) for which GUI and token
  colors are used

If you're not sure why a theme isn't showing up, feel free to
[open an issue](https://github.com/jschr/vscodethemes/issues/new).

Consult the
[VSCode docs](https://code.visualstudio.com/docs/extensions/themes-snippets-colorizers)
for how to build your own theme.
