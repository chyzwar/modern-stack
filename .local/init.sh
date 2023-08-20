#!/bin/bash

if [ ! -f .env ]; then
  echo "DOCKER_USER=$(id -u)" >> .env
  echo "DOCKER_GROUP=$(id -g)" >> .env
  echo "PROJECT_DOMAIN=project.localhost" >> .env
fi

cd ./packages/api || exit
if [ ! -f .env ]; then
  cp .env.default .env
fi
cd - || exit

cd ./packages/ui || exit
if [ ! -f .env ]; then
  cp .env.default .env
fi
cd - || exit

cd ./packages/admin-ui || exit
if [ ! -f .env ]; then
  cp .env.default .env
fi
cd - || exit

if ! [ -x "$(command -v yarn)" ]; then
  echo 'Error: Yarn is not installed.' >&2
  exit 1
fi

if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  exit 1
fi

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

yarn install


 
