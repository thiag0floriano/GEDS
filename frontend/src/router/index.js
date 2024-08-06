import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home.vue';
import ChamadosPage from '../views/Chamados.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/chamados',
    name: 'chamados',
    component: ChamadosPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
