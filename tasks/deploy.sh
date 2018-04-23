#! /bin/bash
set -e

# Deploy the current branch's backend and infrastructure.
dir=infrastructure/env-$BRANCH
if [ -d "$dir" ]; then  
  echo "Deploying $BRANCH..."
  cd infrastructure/env-$BRANCH
  terraform apply -auto-approve terraform.plan

  echo "Deploying frontend..."
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
  docker build . -f frontend/Dockerfile -t vscodethemes/frontend \
    --build-arg ALGOLIA_APP_ID=$TF_VAR_algolia_app_id \
    --build-arg ALGOLIA_SEARCH_KEY=$ALGOLIA_SEARCH_KEY \
    --build-arg GTM_ID=$GTM_ID \
    --build-arg SENTRY_DSN=$TF_VAR_sentry_dsn

  # Push image to heroku.
  echo "Pushing image..."
  docker tag vscodethemes/frontend registry.heroku.com/vscodethemes/web
  docker push registry.heroku.com/vscodethemes/web

  echo "Done."
else 
  echo "Skipping deploy because $dir does not exist."
fi