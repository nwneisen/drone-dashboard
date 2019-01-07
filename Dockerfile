FROM node:10

# Setup the Vue.js application
RUN yarn global add @vue/cli @vue/cli-service-global
WORKDIR /code
COPY package.json yarn.lock ./
EXPOSE 8080

CMD [ "bash", "-c", "yarn install && yarn serve" ]