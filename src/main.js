import Vue from 'vue'
import App from './App.vue'

import {getDistanceBetween} from 'geolocation-distance-between';
Object.defineProperty(Vue.prototype, '$getDistanceBetween', { value: getDistanceBetween });

import VueMqtt from 'vue-mqtt'
Vue.use(VueMqtt, 'ws://iot.eclipse.org:80/ws', {clientId: 11})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
