# drone-dashboard

A dashboard for monitoring drone location in real-time.  

Drones report their geo-location to a central server through a cellular modem connection.  The drones will report back the minimum amount of information needed in order to minimize the amount of connections needed.  Drones use the MQTT protocol for communication as it is a lightweight messaging system designed specifically for IoT devices.  

The dashboard is currently a very simple Vue.js application at this time.  It only consists of a table containing each drone's unique identifier and current geo-location.  If a drone does not move more than 1 meter for 10 seconds, but still reports its location, then the row for that drone will be highlighted.

# Technologies

[MQTT](http://mqtt.org/) - A simple data centric communication protocol designed for IoT devices.  MQTT offers a number of benefits over HTTP.
    * Small message size.  Binary format with a 2 Byte header
    * SSL/TLS security
    * Expect and account for frequent network issues
    * Publish/Subscrive messaging
    * Continuous session awareness
    * and more...

[Vue.js](https://vuejs.org/) - A fronted framework that is simple to use but ahs powerful results

[eslint-plugin-vue](https://eslint.vuejs.org/) - The official ESLint pluging for Vue.js

[vue-mqtt](https://github.com/nik-zp/vue-mqtt) - A library for using MQTT in Vue.js

[Docker](https://www.docker.com/) - A containerization system making it easy to create, deploy, and run applications

[geolocation-distance-between](https://github.com/joelcolucci/geolocation-distance-between) - ES6 module to calculate distance between coordinates

# Assumptions

The average drone speed is 48–80 Km/hr.  Toy and racing drones are available outside of this range but for commercial applications they will probably not be used.  If we figure for the slowest speed, we find that we need .075 seconds for the drone to move 1 meter.  We also know that we want to be able to tell if the drone has been idle for 10 seconds.  This gives us a range that out update frequency should fall between.  I chose to go with an update freqeuncy of 1 second as this gives us buffer space from the lower end, makes the numbers nicer to work with, and will make the dashboard feel responsive for the user.

# Improvements

* Look closer at the vue-mqtt library.  The message payload seems to be required to be a string.  Being able to use binary data would reduce the cost of communication further.
* Better type checking throughout the system
* Setup issues and branches to better manage the project.
* Add more intelligence to the simulator to get more realistic geo-location and update frequency values
* An improved GUI with tests
* Learn more about the requirements of the system to reduce assumptions
* Enable and verify security settings
* Create a script to contain all of the docker commands
* Improve testing to cover MQTT with unit tests

# Running the System

A Dockerfile is used to make the project easy to run on different devices.  To use docker you must first build the image.

```
docker build -t drone-dashboard .
```

Then run the image with a few arguments
```
docker run -it -v ${PWD}:/code -p 8080:8080 drone-dashboard
```
## Sending fake locations
A second instance of the docker image can then be used to send an MQTT message from a client. Simply call the sendDroneLocation.js script with a correctly formatted drone location string.
```
docker run -it -v ${PWD}:/code drone-dashboard node sendDroneLocation.js '3,44.482948,-103.850380'
```

## Running a simulation
The final way to the application is using a simulator.  This uses random number genaration for locations to send to the application to be displayed.  The random number generation is simple and not the best representation of actual data but it shows how the application handles a large number of drones.  A count of the desired number of drones can be passed into the script to gerenate more drones.
```
docker run -it -v ${PWD}:/code drone-dashboard bash simulator 10
```

This will get the project running in developer mode and allow it to be viewed on a local browser.  Additional commands can be ran by overriding the default Dockerfile command.

### Run the tests
```
docker run -it -v ${PWD}:/code drone-dashboard yarn test:unit
```