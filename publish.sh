#!/usr/bin/env bash
export GIT_COMMITTER_NAME="Seung Lee"
export GIT_COMMITTER_EMAIL="code0x9@gmail.com"
export GIT_AUTHOR_NAME="Seung Lee"
export GIT_AUTHOR_EMAIL="code0x9@gmail.com"

echo "## build document"
rm -rf public/*
hugo

echo "## push document"
git add -A
git commit -m "updating document"
git push origin master
git subtree push --prefix=public $(git config --get remote.origin.url) gh-pages
