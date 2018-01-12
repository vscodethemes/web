## VSCode Themes

[![Build Status](https://travis-ci.org/jschr/VSCodeThemes.svg?branch=production)](https://travis-ci.org/jschr/VSCodeThemes)
[![Coverage Status](https://coveralls.io/repos/github/jschr/VSCodeThemes/badge.svg)](https://coveralls.io/github/jschr/VSCodeThemes)

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
