import Vue from 'vue'
import App from './App.vue'
import { ValidationObserver } from 'vee-validate';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
