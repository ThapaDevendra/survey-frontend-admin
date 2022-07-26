import { createApp } from 'vue'
import VueCookies from 'vue3-cookies'
import App from './App.vue'
import router from './router.js'
import vuetify from './plugins/vuetify'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



createApp(App).use(VueCookies)
 .use(router).use(vuetify).mount('#app')

