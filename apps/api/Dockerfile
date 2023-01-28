FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=shn-api --docker

FROM node:18-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
COPY --from=builder /app/apps/api/prisma ./prisma
RUN yarn prisma generate 

RUN yarn turbo run build --filter=shn-api...

FROM node:18-alpine as runner
WORKDIR /app
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs
COPY --from=installer /app .
EXPOSE 3001

CMD node apps/api/dist/main.js