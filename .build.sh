#!/usr/bin/env bash

set -euxo pipefail
shopt -s nullglob

# Build
npx eleventy --input pages

# Move
cp ./_site/index.html ./index.html
for file in ./_site/*/index.html; do
    cp "$file" "./$(basename "$(dirname "$file")").html"
done
