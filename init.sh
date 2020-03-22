#!/bin/bash

echo "DOCKER_USER=$(id -u)" >> .env
echo "DOCKER_GROUP=$(id -g)" >> .env


cd ./packages/api || exit
if [ ! -f .env.local ]; then
  cp .env.default .env.local
fi
cd - || exit

cd ./packages/ui || exit
if [ ! -f .env.local ]; then
  cp .env.default .env.local
fi
cd - || exit

cd ./packages/admin-ui || exit
if [ ! -f .env.local ]; then
  cp .env.default .env.local
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

# It is required to initilize postgres container 
# as docker-compose depend_on do not verify rediness of program in container
# api will run 
docker-compose run postgres

yarn install
yarn start


 
