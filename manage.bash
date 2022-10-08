#!/bin/bash
set -e

function setup {
  rm -rf node_modules
  npm install
  npm run db:reset
  npm run db:migrate
  npm run db:seed
  npm run build

  rm -rf node_modules
  NODE_ENV=production npm i --production
}

function start {
  local port basename
  while getopts "p:b:" opt; do
    case $opt in
      p)
        port="$OPTARG"
        ;;
      b)
        basename="$OPTARG"
        ;;
      *) ;;
    esac
  done

  NODE_ENV=production PORT="$port" GLOBAL_PREFIX="$basename" npm run start:prod
}

function comma_bold {
  sed 's/\w\+/'"${BOLD}&${SGR0}"',/g;s/.$//' <<< "$@"
}

cd "$(dirname "${BASH_SOURCE[0]}")"
cmd="$1"
shift || {
  echo "Arguments expected" >&2
  exit 1
}
case "$cmd" in
  setup)
    setup "$@"
    ;;
  start)
    start "$@"
    ;;
  *)
    echo "Invalild cmd: $cmd. Must be one of: $(comma_bold setup start)" >&2
    exit 1
    ;;
esac
