import { createApp } from 'vue'
import './style.css'
import LoadingPlugin from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(LoadingPlugin)
app.use(router)
app.mount('#app')
