#! /bin/bash
set -e

# Copy the remote .env file for the environment to the root
# project folder. Each env var used here should be set in CI.
if [[ $BRANCH == "production" ]]; then
  export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_PRODUCTION
  export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_KEY_PRODUCTION
  export REMOTE_ENV=s3://$BUCKET_PRODUCTION/production.env
  export LOCAL_ENV=.env
else
  export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_DEV
  export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_KEY_DEV
  export REMOTE_ENV=s3://$BUCKET_DEV/dev.env
  export LOCAL_ENV=.env
fi

aws s3 cp $REMOTE_ENV $LOCAL_ENV