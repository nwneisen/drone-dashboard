<template>

<div>
    <button @click="publishLocation">publishLocation</button>
    <table>
      <tr>
        <th>Drone</th>
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>
      <tr v-for="drone in drones" :key=drone.id>
        <td>{{ drone.id }}</td>
        <td>{{ drone.latitude }}</td>
        <td>{{ drone.longitude }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
  name: 'Dashboard',
  data: function() {
    return {
      drones: [
        { id: 1, latitude: 44.482948, longitude: -103.850380 },
        { id: 2, latitude: 44.080544, longitude: -103.231018 },
      ],
    };
  },
  methods: {
    publishLocation () {
      this.$mqtt.publish('VueMqtt/publishLocation', '4,44.482948,-103.850380')
    }
  },
  mqtt: {
    'VueMqtt/publishLocation' (data) {

      // Split the message on the comma delimiters
      var droneUpdate = String.fromCharCode.apply(null, data).split(",")
      // Add/Update the device in the list
      // TODO Check how far the device moved
      this.drones.push({id: droneUpdate[0], latitude: droneUpdate[1], longitude: droneUpdate[2]})
    },
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