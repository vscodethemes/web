# Build stage

FROM node:22.9.0-alpine3.20 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# Run stage

FROM node:22.9.0-alpine3.20 AS run

WORKDIR /app

ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .
COPY entrypoint.sh /
COPY --from=builder /app/build /app/build

RUN npm install --production

ENTRYPOINT [ "/entrypoint.sh" ]
