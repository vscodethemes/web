#! /bin/bash
set -e

# Set env vars from .env
set -o allexport; source .env; set +o allexport

# Deploy the current branch's backend and infrastructure.
dir=infrastructure/env-$BRANCH
if [[ -d "$dir" ]]; then
  echo "Deploying $BRANCH backend..."
  cd infrastructure/env-$BRANCH
  terraform apply -auto-approve terraform.plan
  cd ../.. 

  if [[ $DOCKER_TAG != "" ]] || [[ $DOCKER_REGISTRY != "" ]]; then
    echo "Deploying $BRANCH frontend..."
    # Heroku auth
    touch ~/.netrc
    echo "machine api.heroku.com" >> ~/.netrc 
    echo "  login $HEROKU_EMAIL" >> ~/.netrc
    echo "  password $HEROKU_TOKEN" >> ~/.netrc
    echo "machine git.heroku.com" >> ~/.netrc
    echo "  login $HEROKU_EMAIL" >> ~/.netrc
    echo "  password $HEROKU_TOKEN" >> ~/.netrc
    heroku container:login

    # Build the frontend docker image.
    echo "Building image..."
    docker build . -f frontend/Dockerfile -t $DOCKER_TAG \
      --build-arg TF_VAR_sentry_dsn=$TF_VAR_sentry_dsn \
      --build-arg TF_VAR_algolia_app_id=$TF_VAR_algolia_app_id \
      --build-arg TF_VAR_algolia_index=$TF_VAR_algolia_index \
      --build-arg ALGOLIA_SEARCH_KEY=$ALGOLIA_SEARCH_KEY \
      --build-arg GTM_ID=$GTM_ID

    # Push image to heroku.
    echo "Pushing image..."
    docker tag $DOCKER_TAG $DOCKER_REGISTRY
    docker push $DOCKER_REGISTRY

    # Release
    echo "Creating release for $HEROKU_APP..."
    heroku container:release -a $HEROKU_APP web

    # Invalidate cache
    AWS_ACCESS_KEY_ID=$TF_VAR_aws_access_key
    AWS_SECRET_ACCESS_KEY=$TF_VAR_aws_secret_key
    aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths /*
  else 
    echo "Skipping frontend because \$DOCKER_TAG or \$DOCKER_REGISTRY is not set."
  fi

  echo "Done."
else 
  echo "Skipping backend because $dir does not exist."
fi