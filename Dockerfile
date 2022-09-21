FROM node:16-alpine

RUN npm install -g http-server

WORKDIR /src
RUN corepack enable

COPY .npmrc package.json ./
RUN pnpm install

COPY . .
RUN pnpm build

# EXPOSE 8080
EXPOSE 80
CMD [ "http-server", "dist" ]

# CMD ["pnpm", "run", "dev"]

# FROM nginx:stable-alpine as production-stage

# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
