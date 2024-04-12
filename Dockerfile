
FROM node:alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

RUN npm install prisma@latest

RUN npm install @prisma/client

RUN apk update && \
    apk add --no-cache mysql-client && \
    npm install

COPY . .

EXPOSE 8008

RUN npx prisma db push

RUN npx prisma db seed

CMD [ "node", "index.js" ]