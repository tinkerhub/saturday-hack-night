FROM node:16-alpine AS build

WORKDIR /app

COPY apps/api/package.json yarn.lock ./
COPY apps/api ./

RUN yarn install
RUN yarn prisma migrate deploy
RUN yarn build

FROM node:16-alpine AS production

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
RUN yarn install --production --frozen-lockfile
RUN yarn prisma generate

CMD ["node", "dist/main"]