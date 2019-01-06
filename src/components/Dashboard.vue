<template>

<div>
    <button @click="publishLocation">publishLocation</button>
    <table>
      <tr>
        <th>Device</th>
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>
      <tr v-for="device in devices" :key=device.id>
        <td>{{ device.id }}</td>
        <td>{{ device.latitude }}</td>
        <td>{{ device.longitude }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
  name: 'Dashboard',
  data: function() {
    return {
      devices: [
        { id: 1, latitude: 44.482948, longitude: -103.850380 },
        { id: 2, latitude: 44.080544, longitude: -103.231018 },
      ],
    };
  },
  methods: {
    publishLocation () {
      this.$mqtt.publish('VueMqtt/publishLocation', 'message to Sub1')
    }
  },
  mqtt: {
    'VueMqtt/publishLocation' (data, topic) {
      // eslint-disable-next-line
      console.log("publishLocation")
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