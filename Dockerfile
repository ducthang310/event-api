FROM node:18-alpine
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package.json yarn.lock /usr/app/

RUN yarn install --prod

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
