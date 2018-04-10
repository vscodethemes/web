#! /bin/bash
set -e

# Yarn doesn't have a way to package only the backend so we use webpack
# to bundle the backend's dependencies (including other workspaces).
# https://github.com/yarnpkg/yarn/issues/4099
#
# Webpack is called on build, all we need to do is zip up the directory
# to upload to AWS Lambda.

echo "Zipping backend..."
cd backend/build
mkdir -p ../../build
zip -r -X backend.zip .
cd ../..
