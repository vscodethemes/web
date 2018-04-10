#! /bin/bash
set -e

echo "Deploying $BRANCH..."
cd infrastructure/env-$BRANCH
terraform apply -auto-approve terraform.plan

echo "Uploading frontend..."
yarn upload-frontend

echo "Done."