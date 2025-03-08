import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../pages/login.vue';
import Dashboard from '../pages/dashboard.vue';
import Create from '../pages/createTask.vue';
import RegisterUser from '../pages/createUser.vue';
import SessionExpired from '../pages/sessionExpired.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/create', component: Create},
  { path: '/register', component: RegisterUser},
  { path: '/sessionExpired', component: SessionExpired}
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;