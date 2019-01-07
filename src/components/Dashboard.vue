<template>

<div>
    <button @click="publishLocation">publishLocation</button>
    <table>
      <tr>
        <th>Drone</th>
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>
      <tr v-for="drone in drones" :key=drone.id v-bind:style="{background: drone.color}">
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
      drones: []
    };
  },
  methods: {
    publishLocation () {
      this.$mqtt.publish('VueMqtt/publishLocation', '3,44.482948,-103.850380')
    },

  },
  mqtt: {
    'VueMqtt/publishLocation' (data) {

      var droneUpdate = String.fromCharCode.apply(null, data).split(",");

      // TODO Use a hashtable
      // Check if the drone is already being displayed
      var i;
      for(i = 0; i < this.drones.length; i++) {
        
        // Update the drone if it's already in the list
        if(this.drones[i].id == droneUpdate[0]) {

          // Check how far the drone moving and color the row if it's not
          var distanceInM = this.$getDistanceBetween({latitude: this.drones[i].latitude, longitude: this.drones[i].longitude}, 
                                                     {latitude: droneUpdate[1], longitude: droneUpdate[2]});          
          console.log(distanceInM);
          if(distanceInM < 1) {
            this.drones[i].color = "Yellow";
          }

          this.drones[i].latitude = droneUpdate[1];
          this.drones[i].longitude = droneUpdate[2];
          break;
        }
      }

      // If we didn't find the drone, add it now
      if(i == this.drones.length) {
        this.drones.push({id: droneUpdate[0], latitude: droneUpdate[1], longitude: droneUpdate[2], color: "White"});
      }
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