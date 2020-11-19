# Frontdesk API

Provide all API using [Feathersjs](https://feathersjs.com/)

## System Requirement

1. Node 12 lts
2. PostgresSQL 12

## Setup Howto

### Environment Variable

Although Feathers.js provide app config using `node-config`, we still keep all credential related info in environment variable.

Use `.env` or env var to setup the following variable:

- Server and Database
  - `HOST`: Host name of server
  - `DATABASE_URL`: DB connection string
- Chat bot
  - `MESSENGER_PAGE_ID`: Facebook Page to use
  - `MESSENGER_ACCESS_TOKEN`: Page access token
  - `MESSENGER_APP_ID` & `MESSENGER_APP_SECRET`: Facebook App ID
  - `MESSENGER_VERIFY_TOKEN`: Chatbot verify token
  - `ONBOARD_PASSPHRASE`: 
- Option log
  - `SENTRY_DSN`: dsn of sentry


## Dev Howto

```
npm i
npm run dev
```

## Production Howto

TBD

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```
