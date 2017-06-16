# Voting App
<https://www.freecodecamp.com/challenges/build-a-voting-app>

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### User stories
* As an authenticated user, I can keep my polls and come back later to access them.
* As an authenticated user, I can share my polls with my friends.
* As an authenticated user, I can see the aggregate results of my polls.
* As an authenticated user, I can delete polls that I decide I don't want anymore.
* As an authenticated user, I can create a poll with any number of possible items.
* As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
* As an unauthenticated or authenticated user, I can see the results of polls in chart form.
* As an authenticated user, if I don't like the options on a poll, I can create a new option.

## Running
Install the dependences:

```bash
npm i
```

### Environment Variables
Set the following environment variables:

* `DB_URL` : The MongoDB connection URI (By default it will connect to `mongodb://localhost/votingApp`).
* `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL` :  The *Google client ID*, *Google client secret key* and *Google OAuth callback URL* respectively (If you leave this blank the google login will not be enabled). [Read more](https://github.com/jaredhanson/passport-google-oauth2#create-an-application)

Run it:

```bash
npm run dev
```

## Building For Production

```bash
npm run build
```

The builded files will be available at `app/build` directory.

After setting the [environment variables](#environment-variables)...

```bash
npm start
```

## Using Docker
Create the required .env files at `app` and `db` directories

```bash
$ touch app/.env && touch db/.env
```

In the `app/.env` file set the [environment variables](#environment-variables) in this file ([example](https://docs.docker.com/compose/compose-file/#env_file)), and
in the `db/.env` file set the following variables:
* `MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD` : The MongoDB admin username and password
* `MONGO_APP_USERNAME`, `MONGO_APP_PASSWORD` : The MongoDB username and password (You must set the `DB_URL` according
to this setting. [Read more](https://docs.mongodb.com/manual/reference/connection-string)).

Build and run it:
```bash
docker-compose build && docker-compose up
```

Note: By default the `docker-compose build` command builds the app in production mode.
