<template>
<table>
  <tr>
    <th>Device </th>
    <th>Latitude</th>
    <th>Longitude</th>
  </tr>
  <tr>
    <td>1</td>
    <td>44.482948</td>
    <td>-103.850380</td>
  </tr>
  <tr>
    <td>2</td>
    <td>44.080544</td>
    <td>-103.231018</td>
  </tr>
</table>
</template>

<script>
  export default {
  name: 'Dashboard',
  created() {
    var net = require('net')
    var mqttCon = require('mqtt-connection')
    var server = new net.Server()
    server.on('connection', function (stream) {
      var client = mqttCon(stream)
    
      // client connected
      client.on('connect', function (packet) {
        // acknowledge the connect packet
        client.connack({ returnCode: 0 });
        // eslint-disable-next-line
        console.log(packet)
      })
    
      // client published
      client.on('publish', function (packet) {
        // send a puback with messageId (for QoS > 0)
        client.puback({ messageId: packet.messageId })
      })
    
      // client pinged
      client.on('pingreq', function () {
        // send a pingresp
        client.pingresp()
      });
    
      // client subscribed
      client.on('subscribe', function (packet) {
        // send a suback with messageId and granted QoS level
        client.suback({ granted: [packet.qos], messageId: packet.messageId })
      })
    
      // timeout idle streams after 5 minutes
      stream.setTimeout(1000 * 60 * 5)
    
      // connection error handling
      client.on('close', function () { client.destroy() })
      client.on('error', function () { client.destroy() })
      client.on('disconnect', function () { client.destroy() })
    
      // stream timeout
      stream.on('timeout', function () { client.destroy(); })
    })
    
    // listen on port 1883
    server.listen(1883)
    }
  }
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>