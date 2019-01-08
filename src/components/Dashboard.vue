<template>

<div>
    <table>
      <tr>
        <th>Drone</th>
        <th>Speed (Km/hr)</th>
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>
      <tr v-for="drone in drones" :key=drone.id v-bind:style="{background: drone.color}">
        <td>{{ drone.id }}</td>
        <td>{{ drone.speed }}</td>
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
    // Gets speed in Km/hr assuming 1 second for the distance traveled
    getSpeedInKmPerHour(distanceInKm) {
      const secondsInAnHour = 3600;
      return distanceInKm*secondsInAnHour;
    },
    // Determines if the drone should be flagged as idle
    getRowColor(idleSeconds) {
      const maxIdleSeconds = 10;
      if(idleSeconds >= maxIdleSeconds) {
        // Color the row yellow if the drone hasn't moved
        return "Yellow";
      }

      return "White";
    },
    // Finds the amount of seconds the drone has been idle for
    getIdleSeconds(distanceInKm, idleSeconds) {
      const idleDistanceKm = 0.001;
      if(distanceInKm < idleDistanceKm) {
        return idleSeconds+1;
      }

      return 0;
    }
  },
  mqtt: {
    'VueMqtt/publishLocation' (data) {      

      var droneMessage = String.fromCharCode.apply(null, data).split(",");

      // TODO Use a hashtable - standard javascript array indexing does not work with vue.js reactivity
      
      // Check if the drone is already being displayed
      var i;
      for(i = 0; i < this.drones.length; i++) {
        
        // Update the drone if it's already in the list
        if(this.drones[i].id == droneMessage[0]) {

          // Check how far the drone has moved
          var distanceInKm = this.$getDistanceBetween({latitude: this.drones[i].latitude, longitude: this.drones[i].longitude}, 
                                                      {latitude: droneMessage[1], longitude: droneMessage[2]});   
          
          // Update the drone's information
          this.drones[i].latitude = droneMessage[1];
          this.drones[i].longitude = droneMessage[2];
          this.drones[i].speed = this.getSpgetSpeedInKmPerHoureed(distanceInKm);
          // We need to update the idle seconds before getting the row color
          this.drones[i].idleSeconds = this.getIdleSeconds(distanceInKm, this.drones[i].idleSeconds);
          this.drones[i].color = this.getRowColor(this.drones[i].idleSeconds);
          break;
        }
      }

      // If we didn't find the drone, add it now
      if(i == this.drones.length) {
        this.drones.push({id: droneMessage[0], 
                          latitude: droneMessage[1], 
                          longitude: droneMessage[2], 
                          speed: 0, 
                          color: "White",
                          idleSeconds: 0});
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