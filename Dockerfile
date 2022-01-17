FROM node:16.13.2-alpine3.15 as build

WORKDIR /app
COPY . /app

RUN npm install && npm run build

# DEPLOY-Container
FROM httpd:2.4-bullseye
ARG COMMIT_HASH="none"
ARG COMMIT_TAG="none"
ENV COMMIT_HASH=$COMMIT_HASH
ENV COMMIT_TAG=$COMMIT_TAG
LABEL commit-hash=$COMMIT_HASH
LABEL commit-tag=$COMMIT_TAG

COPY --from=build /app/build /usr/local/apache2/htdocs

ENTRYPOINT ["httpd", "-D", "FOREGROUND"]
