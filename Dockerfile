FROM node:19.1.0-alpine

RUN mkdir /app && chown 1000:1000 /app

ARG ENVIRONMENT

USER node

ENV ENVIRONMENT ${ENVIRONMENT}

ENV NPM_CONFIG_LOGLEVEL error
WORKDIR /app
COPY --chown=1000:1000 . .

RUN export PATH=$PATH:./node_modules/next/dist/bin/ &&\
  npm prune --production=true &&\
  npm run build:${ENVIRONMENT}

EXPOSE 3000
CMD npm run start:production
