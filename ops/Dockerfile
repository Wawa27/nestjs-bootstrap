# Build
FROM node:24-alpine AS build
WORKDIR /app

RUN corepack enable

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Run
FROM node:24-alpine
WORKDIR /app

COPY --from=build /app/dist/ ./
COPY --from=build /app/node_modules ./node_modules

ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

CMD ["node", "./main"]
