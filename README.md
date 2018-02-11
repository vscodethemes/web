[![vscodethemes](frontend/assets/logo.png)](https://vscodethemes.com)

[![Build Status](https://travis-ci.org/jschr/vscodethemes.svg?branch=production)](https://travis-ci.org/jschr/vscodethemes)

---

Preview themes from the VSCode marketplace.

**Built with**

* [AWS Lambda](https://aws.amazon.com/lambda/),
  [SQS](https://aws.amazon.com/sqs/) and [SNS](https://aws.amazon.com/sns/)
* [Typescript](https://www.typescriptlang.org/)
* [Terraform](https://www.terraform.io/)
* [React](https://reactjs.org/) and
  [Syntax Highlighter](https://github.com/conorhastings/react-syntax-highlighter)
* [Webpack](https://webpack.js.org/) and
  [Static Site Generator Plugin](https://github.com/markdalgleish/static-site-generator-webpack-plugin)

## How it works

[TODO]

### Sharing runtime and static types

[TODO]

## CI / CD

[TODO]

### Terraform Gotchas

I'm using Terraform's count parameter to
[conditionally create policies for policies, sns triggers and cloudwatch subscriptions](/infrastructure/modules/backend/lambda/lambda#L42)
for the lambdas.

Since
[count cannot be a computed value](https://github.com/hashicorp/terraform/issues/12570)
This creates a scenario where when we create a new lambda we need to deploy
twice. Once to first create the required sns topics, sqs queues or cloudwatch
events in order to save the resource ids to state and than finally a second time
to actually create the lambda function.
