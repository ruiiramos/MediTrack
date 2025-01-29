import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import MedicationView from '../views/MedicationView.vue';
import ProfileView from '../views/ProfileView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/medication',
      name: 'medication',
      component: MedicationView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    }
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Verifica se o token de autenticação está presente

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Se a rota requer autenticação e o usuário não está autenticado, redireciona para a página de login
    next({ name: 'login' });
  } else {
    // Caso contrário, permite a navegação
    next();
  }
});

export default router;