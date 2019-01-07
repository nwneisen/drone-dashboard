#! /usr/bin/env node

var mqtt = require('mqtt')
var client = mqtt.connect('ws://iot.eclipse.org:80/ws')
 
client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('VueMqtt/publishLocation', process.argv[2])
    }
    client.end()
  })
})