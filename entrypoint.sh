#!/bin/sh

if [ -z "$PORT" ]; then
  echo "PORT is not set. Exiting."
  exit 1
fi

echo "Starting server on $PORT..."
npm run start --port $PORT