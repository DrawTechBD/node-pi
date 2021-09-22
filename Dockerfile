FROM node:16-alpine as base

WORKDIR /src

COPY package*.json /
EXPOSE 5000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["npm", "start"]


FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install --quiet
COPY . /
CMD ["npm", "server"]