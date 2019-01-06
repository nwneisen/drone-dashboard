import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Vuetify configs
import Vuetify from 'vuetify'
Vue.use(Vuetify)

new Vue({
  render: h => h(App),
}).$mount('#app')
