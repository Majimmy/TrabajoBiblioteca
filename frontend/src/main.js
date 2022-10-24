import { createApp } from 'vue'
import App from './App.vue'
// "npm install bootstrap". se importa bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// "nmp install vue-router@4". se importa router
import router from './router'

createApp(App).use(router).mount('#app')
