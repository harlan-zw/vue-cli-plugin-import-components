import Vue from 'vue'
import App from './App.vue'
import { ValidationObserver } from 'vee-validate';

Vue.config.productionTip = false

Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
