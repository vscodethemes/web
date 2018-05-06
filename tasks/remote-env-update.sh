#! /bin/bash
set -e

# Update the remote env file for the specified branch / environment.
if [[ $BRANCH == "production" ]]; then
  export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_PRODUCTION
  export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_KEY_PRODUCTION
  export REMOTE_ENV=s3://$BUCKET_PRODUCTION/production.env
  export LOCAL_ENV=infrastructure/env-production/production.env
elif [[ $BRANCH == "dev" ]]; then
  export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_DEV
  export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_KEY_DEV
  export REMOTE_ENV=s3://$BUCKET_DEV/dev.env
  export LOCAL_ENV=infrastructure/env-dev/dev.env
fi

aws s3 cp $LOCAL_ENV $REMOTE_ENV



