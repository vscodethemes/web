#! /bin/bash
set -e
# Set env vars from .env
set -o allexport; source .env; set +o allexport

# Generate the plan for the current branch's environment.
dir=infrastructure/env-$BRANCH
if [ -d "$dir" ]; then
  echo "Generating $BRANCH plan..."
  cd $dir
  # Initialize s3 state storage backend.
  terraform init \
    -input=false \
    -backend-config "region=$TF_VAR_region" \
    -backend-config "access_key=$TF_VAR_aws_access_key" \
    -backend-config "secret_key=$TF_VAR_aws_secret_key" \
    -backend-config "bucket=$STATE_BUCKET" \
    -backend-config "key=$STATE_KEY"
  # Get modules.
  terraform get
  # Generate infrastructure changes and output the plan.
  terraform plan -input=false -out=terraform.plan
else
  echo "Skipping plan because $dir does not exist."
fi