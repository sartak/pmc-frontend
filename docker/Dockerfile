FROM node:alpine

RUN apk add python3 make gcc g++ musl-dev bash

WORKDIR /app
COPY . .

CMD ["/bin/bash", "-c", "npm install; NODE_ENV=production npm run build; NODE_ENV=production node_modules/.bin/next start"]
