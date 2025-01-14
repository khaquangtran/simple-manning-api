#!/bin/bash

# would prefer you guys already had 'pnpm'
pnpm install .

# cp .env.example -> .env
cp .env.example .env

# generate type files
pnpm run prisma:generate

# build and run local on background
docker compose -f ./docker-compose.yaml up --detach

# apply schema to the db
pnpm run prisma:prod