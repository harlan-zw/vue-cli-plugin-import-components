import { createApp } from 'vue'
import App from './App.vue'
import ValidationObserver from './global/ValidationObserver'

createApp(App)
  .component('ValidationObserver', ValidationObserver)
  .mount('#app')
