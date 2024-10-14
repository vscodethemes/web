#!/bin/sh


if [ -z "$PORT" ]; then
  echo "PORT is not set. Exiting."
  exit 1
fi

if [ -z "$API_URL" ]; then
  echo "API_URL is not set. Exiting."
  exit 1
fi

if [ -z "$API_KEY" ]; then
  echo "PORT is not set. Exiting."
  exit 1
fi

if [ -z "$WEB_URL" ]; then
  echo "WEB_URL is not set. Exiting."
  exit 1
fi

echo "Starting server on $PORT..."
npm run start --port $PORT