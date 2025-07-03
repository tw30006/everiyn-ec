import { createApp } from 'vue'
import './style.css'
import LoadingPlugin from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(LoadingPlugin)
app.use(pinia)
app.use(router)
app.mount('#app')
