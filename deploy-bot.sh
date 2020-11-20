#!/bin/bash
cd "$( dirname "${BASH_SOURCE[0]}" )"
git subtree push --prefix room-reporter-backend heroku master && heroku logs --tail

