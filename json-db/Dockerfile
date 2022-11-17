FROM node:19.1.0-alpine

RUN npm install -g json-server

WORKDIR /data
VOLUME /data

EXPOSE 3004
ADD run.sh /run.sh
ADD db.json /data
ADD file.js /data
ENTRYPOINT ["/run.sh"]
CMD []
