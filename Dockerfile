FROM node:16-alpine

WORKDIR /app
RUN corepack enable

COPY .npmrc package.json ./
RUN pnpm install

COPY . .
RUN pnpm build

CMD ["pnpm", "run", "dev"]

# FROM nginx:stable-alpine as production-stage

# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
