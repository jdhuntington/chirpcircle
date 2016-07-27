FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app/
RUN npm install
RUN npm run build
EXPOSE 8000
ENV NODE_ENV=production
CMD [ "npm", "run", "start:prod" ]
