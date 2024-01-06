import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'
import router from "./routers"

const app = createApp(App)
app.use(router).use(createPinia())

app.mount('#app')
