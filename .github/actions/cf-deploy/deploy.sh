#!/bin/bash

export INTERNAL_API_URL=$1
export INTERNAL_API_KEY=$2
export GITHUB_TOKEN=$3
export CF_API_TOKEN=$4

cd $GITHUB_WORKSPACE

yarn install
yarn generate-wrangler-toml
yarn deploy
