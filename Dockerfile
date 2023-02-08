# ---- Base Node ----
FROM node:17-alpine3.13 AS base
LABEL maintainer="lucas.augusto5061@gmail.com"

RUN apk add --no-cache tini yarn git
WORKDIR /app
ENTRYPOINT [ "/sbin/tini", "--" ]
COPY package.json .

# ---- Dependencies ----
FROM base AS dependecies
RUN npm set progress=false && npm config set depth 0
RUN yarn install --only=production
RUN cp -R node_modules prod_node_modules
RUN yarn install

# ---- Test ----
FROM dependencies AS test
COPY src .
RUN yarn lint && yarn test

# ---- Release ----
FROM base AS release
COPY --from=dependecies /app/prod_node_modules ./node_modules
COPY . .
EXPOSE 80
CMD npm run start
