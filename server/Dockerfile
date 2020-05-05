FROM node:12.16.3-alpine
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
CMD ["yarn", "start"]