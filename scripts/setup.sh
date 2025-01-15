#!/bin/bash

# would prefer you guys already had 'pnpm'
pnpm install .
npm install .

# cp .env.example -> .env
cp .env.example .env