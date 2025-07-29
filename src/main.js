import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

let gAuthClientId = '606526375453-35lomk0am1hvl25q6s354ddri0ifjtqd.apps.googleusercontent.com'
app.use(vue3GoogleLogin, {
  clientId: gAuthClientId,
})

app.use(createPinia())
app.use(router)
app.mount('#app')