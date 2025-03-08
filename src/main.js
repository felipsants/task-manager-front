import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify';
import axios from 'axios'

axios.interceptors.response.use(
    (response) => {
      // Se a resposta for bem-sucedida, retorna-a normalmente
      return response;
    },
    (error) => {
      // Se a resposta retornar 401, redireciona para a página de sessão expirada
      if (error.response && error.response.status === 401) {
        router.push('/sessionExpired');
      }
      return Promise.reject(error);
    }
  )

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router);
app.use(createPinia());
app.use(vuetify);   
app.mount('#app')
