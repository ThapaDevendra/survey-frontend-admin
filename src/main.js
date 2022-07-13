import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import vuetify from './plugins/vuetify'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



createApp(App)
 .use(router).use(vuetify).mount('#app')
