FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD package.json /usr/src/app/
RUN npm install
ADD server /usr/src/app/server
ADD shared /usr/src/app/shared
ADD static /usr/src/app/static
ADD index.js /usr/src/app/
ADD .babelrc /usr/src/app/
ADD webpack* /usr/src/app/
EXPOSE 8000
ENV NODE_ENV=production
CMD [ "npm", "run", "start:prod" ]
