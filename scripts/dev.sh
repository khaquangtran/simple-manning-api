#!/bin/bash

# generate type files
npm run prisma:generate

# build and run local on background
docker compose -f ./docker-compose.yaml up --detach

# apply schema to the db
npm run prisma:prod