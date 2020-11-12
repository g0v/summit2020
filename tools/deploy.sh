#!/bin/bash

target="$1"

cd "$(dirname "$0")/.."

dsn="https://299d3f9217404461bea28af398422ffd@o413793.ingest.sentry.io/5447103"

# commit 9f35ec79d675d62c96687755a58319c1c08f313a (HEAD -> feat/deploy-efficiency)
headCommit=`git log -n1 | head -1 | cut -d' ' -f2`

dirtyCount=`git status -s | wc -l`

if [ "$target" != "-p" ]; then
  echo Deploy to staging
fi

if [ $dirtyCount -gt 0 ]; then
  >&2 echo Cancel deploying as we get uncommitted changes
  exit 1
fi

if [ -f ".env" ]; then
  mv .env .env.back
  touch .env
fi

if [ "$target" == "-p" ]; then
  env SENTRY_DSN="$dsn" TRAVIS_COMMIT="$headCommit"  npm run generate:production
else
  env SENTRY_DSN="$dsn" TRAVIS_COMMIT="$headCommit"  npm run generate:staging && npm run deploy:staging
fi

if [ -f ".env.back" ]; then
  mv .env.back .env
fi

git checkout static/sw.js > /dev/null
