FROM node:10

RUN yarn global add @vue/cli @vue/cli-service-global

# make the 'app' folder the current working directory
WORKDIR /code

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package.json yarn.lock ./

EXPOSE 8080

CMD [ "bash", "-c", "yarn install && yarn serve" ]