import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify';
import axios from 'axios'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router);
app.use(createPinia());
app.use(vuetify);   
app.mount('#app')
