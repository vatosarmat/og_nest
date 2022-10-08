#!/bin/bash
set -e

mkdir build

cp -t build \
  package.json package-lock.json \
  tsconfig.build.json tsconfig.json \
  mikro-orm.config.ts nest-cli.json \
  manage.bash
rsync -r --exclude node_modules \
  src db \
  build
