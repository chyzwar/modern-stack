
![Github Actions](https://github.com/chyzwar/modern-stack/workflows/Build/badge.svg)

# Modern Stack

Boilerplate for full-stack typescript project.
Create React App + Fastify API in monorepo.

## Prerequisites

This project require number of tools available.

- [Docker](https://docs.docker.com/install/)
- [Docker-compose](https://docs.docker.com/compose/install/)
- [Yarn](https://yarnpkg.com/)

## Getting started

Repo provides an init script that will bootstrap baseline env files
It will check if the user has docker and docker-compose installed.
For OAuth to work, google and facebook configs need to updated in packages/api .env

Clone repository

```sh
git clone https://github.com/chyzwar/modern-stack.git my-project
cd my-project
```

Initialize env

```sh
yarn initialize
```

Start project

```sh
yarn start
```

You can now visit: http://project.localhost

Setup auth provider(optional)

- [Facebook](https://developers.facebook.com/docs/facebook-login/web/)
- [Google](https://developers.google.com/identity/sign-in/web/sign-in)

Update packages/api/.env with client id and client secrets

## What is included

### API

Based on [fastify](https://www.fastify.io/). It is a modern node.js framework with a good ecosystem of plugins. Postgres is used for database and managed by [Sequelize](https://sequelize.org/) ORM.

- migration and seeding with sequelize
- authentication with JWT and cookies
- integration with oauth2: Google, Facebook
- logging with pino
- hot reload with nodemon

### UI

Standard typescript application based on create-react-app. Basic authentication under /login. Use [Material-UI](https://material-ui.com/) for Login page and react-router for frontend routes.

- material-ui components
- react-router routing
- basic auth integration

There is also a secondary UI application admin-ui. There is not much done beside bootstrap. It can be removed or used for the different business use case.

### Testing

Unit testing is provided by Jest. There few test examples (not enough). For API test there are an example of testing leveraging fastify [http injection](https://github.com/fastify/fastify/blob/master/docs/Testing.md)

- [Jest](https://github.com/facebook/jest)

### CI/CD

The project provides basic automation pipeline using Github actions. Dependabot scan weekly for outdated packages and creates automatic PRs.

- [Github Actions](https://github.com/features/actions)
- [Renovate](https://docs.renovatebot.com/)

### Tools

Project use yarn workspaces to support hoisting dependencies and managing packages in monorepo. Husky and lint staged provide baseline git hooks. ESlint is configured with more strict airbnb config. Project will is configured with docker-compose to manage multiple containers.

- [Husky](https://www.npmjs.com/package/husky)
- [Lint Staged](https://github.com/okonet/lint-staged)
- [Eslint](https://github.com/eslint/eslint)
- [Commitlint](https://github.com/conventional-changelog/commitlint)

## TODO

- [ ] Add classic auth (login + password)
- [ ] E2E tests setup using cypress
- [ ] Deployment strategy AWS ECS/Fargate/Zeit
- [ ] Audit security settings JWT/Cookies/Headers
- [ ] Create an basic admin application
