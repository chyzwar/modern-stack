
![Github Actions](https://github.com/chyzwar/modern-stack/workflows/Build/badge.svg)

# Modern Stack

Typescript Create React App + Fastify API in monorepo

## Getting started

Repo provide init script that will setup baseline env files
It will check if user have docker and docker-compose installed.

```sh
yarn init
```

Once project is initialized:

```sh
yarn start
```

## What is included

### API

Based on [fastify](https://www.fastify.io/). It is modern node.js framework with good ecosystem of plugins. Postgres is used for database and managed by [Sequelize](https://sequelize.org/) ORM.

- migration and seeding with sequelize
- authentication with JWT
- integration with oauth2: Google, Facebook
- logging with pino
- hot reload with nodemon

### UI

Standard typescript application based on create-react-app. Basic authentication under /login. Use [Material-UI](https://material-ui.com/) for Login page and react-router for frontend routes.

- material-ui components
- react-router routing
- basic auth integration

### Testing

Unit testing is provided by Jest. There few test examples (not enough)

- [Jest](https://github.com/facebook/jest)

### CI/CD

Project provide basic automation pipeline using Github actions. Dependabot add weekly scanning of outdated packages and create automatic PRs.

- [Github Actions](https://github.com/features/actions)
- [Dependabot](https://dependabot.com/)

### Tools

Project use yarn workspaces to support hoisting dependencies and managing packages in monorepo. Husky and lint staged provide baseline git hooks. Eslint is configured with more strict airbnb config. Project run will start in docker using docker-compose to manage multiple containers.

- [Docker-compose](https://docs.docker.com/compose/)
- [Yarn](https://yarnpkg.com/)
- [Husky](https://www.npmjs.com/package/husky)
- [Lint Staged](https://github.com/okonet/lint-staged)
- [Eslint](https://github.com/eslint/eslint)
