FROM node:19.1.0-alpine

RUN mkdir /app && chown 1000:1000 /app

USER node

ENV NPM_CONFIG_LOGLEVEL error
WORKDIR /app
COPY --chown=1000:1000 . .

RUN export PATH=$PATH:./node_modules/next/dist/bin/ &&\
  npm i global json-server &&\
  npm prune --production=true &&\
  nohup sh -c "npm run server &" && \
  npm run build

EXPOSE 3000
CMD npm run start:production
