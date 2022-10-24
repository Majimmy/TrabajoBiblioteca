import { createApp } from 'vue'
import App from './App.vue'
// se importa bootstrap. Sirve para poder utilizar elementos para la pagina web (como bulma)
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// se importa router. Router sirve para poder utilizar mas de una pagina en la aplicacion web creando rutas predefinidas. 
//Esto resulta en optimizar cantidad de codigo escrito y establece un orden en los template que ahora se pueden dividir en .js separados.
import router from './router'

createApp(App).use(router).mount('#app')
