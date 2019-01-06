# drone-dashboard

A dashboard for monitoring drone location in real-time.  

Drones report their geo-location to a central server through a cellular modem connection.  The drones will report back the minimum amount of information needed in order to minimize the amount of connections needed.  Drones use the MQTT protocol for communication as it is a lightweight messaging system designed specifically for IoT devices.  

The dashboard is currently a very simple Vue.js application at this time.  It only consists of a table containing each drone's unique identifier and current geo-location.  If a drone does not move more than 1 meter for 10 seconds, but still reports its location, then the row for that drone will be highlighted.

# Technologies

MQTT - A simple data centric communication protocol designed for IoT devices.  MQTT offers a number of benefits over HTTP.
    * Small message size.  Binary format with a 2 Byte header
    * SSL/TLS security
    * Expect and account for frequent network issues
    * Publish/Subscrive messaging
    * Continuous session awareness
    * and more...

Vue.js - A fronted framework that is simple to use but ahs powerful results

eslint-plugin-vue - The official ESLint pluging for Vue.js

Vue-Mqtt - A library for connecting to a MQTT websocket in Vue.js

Docker - A containerization system making it easy to create, deploy, and run applications

# Assumptions

# Running the System

A Dockerfile is used to make the project easy to run on different devices.  To use docker you must first build the image.

```
docker build -t drone-dashboard .

Then run the image with a few arguments
```
```
docker run -it -v ${PWD}:/code -p 8080:8080 drone-dashboard
```

This will get the project running and allow it to be viewed on a local browser.  Additional commands can be manually ran inside of the docker container if needed.

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```