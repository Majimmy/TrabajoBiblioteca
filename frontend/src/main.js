import { createApp } from 'vue'
import App from './App.vue'
// se importa bootstrap. Sirve para poder utilizar elementos para la pagina web (como bulma)
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// se importa router. Router sirve para crear rutas predefinidas. Optimiza cantidad de codigo escrito y establece un orden.
import router from './router'

createApp(App).use(router).mount('#app')
