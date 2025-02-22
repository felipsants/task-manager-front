import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../pages/login.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;