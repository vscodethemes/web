#! /bin/bash
set -e
# Set env vars from .env
set -o allexport; source .env; set +o allexport

yarn wsrun --exclude-missing dev 