#! /bin/bash
set -e

echo "Generating $BRANCH plan..."
# Generate the plan for the current branch's environment.
cd infrastructure/env-$BRANCH
# Initialize s3 state storage backend.
terraform init \
  -input=false \
  -backend-config "region=$TF_VAR_region" \
  -backend-config "access_key=$TF_VAR_aws_access_key" \
  -backend-config "secret_key=$TF_VAR_aws_secret_key"
# Get modules.
terraform get
# Generate infrastructure changes and output the plan.
terraform plan -input=false -out=terraform.plan