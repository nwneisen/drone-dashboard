import Vue from 'vue'
import App from './App.vue'

import VueMqtt from 'vue-mqtt';
Vue.use(VueMqtt, 'ws://iot.eclipse.org/ws');

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
