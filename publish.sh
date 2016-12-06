#!/usr/bin/env bash
GIT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
GIT_REPOSITORY=git@github.com:kakao/citedocs.git
HUGO_CONFIG="config.toml"
export GIT_COMMITTER_NAME="Seung Lee"
export GIT_COMMITTER_EMAIL="code0x9@gmail.com"
export GIT_AUTHOR_NAME="Seung Lee"
export GIT_AUTHOR_EMAIL="code0x9@gmail.com"

echo "## push document source to $GIT_REPOSITORY / $GIT_BRANCH"
git add -A
git commit -m "updating document"
git push $GIT_REPOSITORY $GIT_BRANCH

echo "## push document to $GIT_REPOSITORY / gh-pages"
rm -rf public
git clone -b gh-pages --depth 1 $GIT_REPOSITORY public

hugo --config $HUGO_CONFIG

cd public
git add -A
git commit -m "updating document"
git push $GIT_REPOSITORY gh-pages
