#!/bin/bash -x
# Credit: https://www.vinaygopinath.me/blog/tech/commit-to-master-branch-on-github-using-travis-ci/

setup_git() {
  git config --global user.email "bot@summit.g0v.tw"
  git config --global user.name "Summit Bot"
}

commit_country_json_files() {
  git checkout master
  # Current month and year, e.g: Apr 2018
  dateAndMonth=`date "+%b %Y"`
  # Stage the modified files in dist/output
  git add -f assets static
  # Create a new commit with a custom build message
  # and Travis build number for reference
  git commit -m "Document auto update: $dateAndMonth (Build $TRAVIS_BUILD_NUMBER)"
}

upload_files() {
  # Remove existing "origin"
  git remote rm origin
  # Add new "origin" with access token in the git URL for authentication
  git remote add origin https://$GITHUB_TOKEN@github.com/g0v/summit2020.git
  git push origin master
}

setup_git

commit_country_json_files

# Attempt to commit to git only if "git commit" succeeded
if [ $? -eq 0 ]; then
  echo "Document update found. Uploading to GitHub"
  upload_files
else
  echo "No changes found. Nothing to do"
fi
