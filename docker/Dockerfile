FROM node:alpine AS deps

RUN apk add python3 make gcc g++ musl-dev

WORKDIR /app
COPY . .
RUN npm ci
ENV NODE_ENV=production
RUN npm run build

CMD ["node_modules/.bin/next", "start"]
