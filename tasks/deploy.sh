#! /bin/bash
set -e

# Deploy the current branch's environment.
dir=infrastructure/env-$BRANCH
if [ -d "$dir" ]; then  
  echo "Deploying $BRANCH..."
  cd infrastructure/env-$BRANCH
  terraform apply -auto-approve terraform.plan

  echo "Uploading frontend..."
  yarn upload-frontend

  echo "Done."
else 
  echo "Skipping deploy because $dir does not exist."
fi