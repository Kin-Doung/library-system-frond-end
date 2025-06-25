import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vue3-toastify/dist/index.css'
import Toastify from 'vue3-toastify'
const app = createApp(App)
app.use(Toastify, {
  autoClose: 3000,
  position: "top-right"
})

import App from './App.vue'
import router from './router'

// const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
