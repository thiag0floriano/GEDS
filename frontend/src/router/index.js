import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Chamados from '../views/Chamados.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/chamados/:id?', name: 'Chamados', component: Chamados },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;
