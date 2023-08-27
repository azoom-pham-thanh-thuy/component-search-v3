import { createApp } from 'vue'
import vuetify from '@/plugins/vuetify'
import App from '@/sample/App.vue'

const app = createApp(App)
app.use(vuetify)
app.mount('#app')
