FROM node:latest

WORKDIR /usr/src/app

ARG PORT
ENV PORT=${PORT}

COPY package*.json ./

RUN npm install .

COPY . .

RUN npm run prisma:generate && npm run build

EXPOSE 8080

CMD ["npm", "start"]
