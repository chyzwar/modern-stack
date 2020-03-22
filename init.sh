#!/bin/bash

echo "DOCKER_USER=$(id -u)" >> .env
echo "DOCKER_GROUP=$(id -g)" >> .env


cd ./packages/api
cp .env.default .env.local
cd -

cd ./packages/ui
cp .env.default .env.local
cd -

cd ./packages/admin-ui
cp .env.default .env.local
cd -

 
