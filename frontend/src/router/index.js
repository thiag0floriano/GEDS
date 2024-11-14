import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Chamados from '../views/Chamados.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Tarefas from '../views/Tarefas.vue';
import Relatorios from '../views/Relatorios.vue';
import Usuarios from '../views/Usuarios.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/chamados/:id?', name: 'Chamados', component: Chamados },
  { path: '/tarefas', name: 'Tarefas', component: Tarefas },
  { path: '/relatorios', name: 'Relatorios', component: Relatorios },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/usuarios', name: 'Usuarios', component: Usuarios },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Proteção de rota
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

