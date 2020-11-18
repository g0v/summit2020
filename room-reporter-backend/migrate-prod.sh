#!/bin/bash

DATABASE_URL=`heroku config:get DATABASE_URL`

DATABASE_URL=$DATABASE_URL NODE_ENV=production sequelize db:migrate

