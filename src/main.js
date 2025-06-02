import './assets/main.css'
import 'primeicons/primeicons.css'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { Buffer } from 'buffer'
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const globalOptions = {
  mode: 'auto',
}

const app = createApp(App)
app.use(router)
app.use(Toast)
app.use(VueTelInput, globalOptions)

const pinia = createPinia()
app.use(pinia)

window.Buffer = Buffer

app.mount('#app')
