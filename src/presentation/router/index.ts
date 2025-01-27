import { inject } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { GetCurrentUser } from '@/domain/usecases/user/GetCurrentUser';
import { RouterChildren } from '@/utils/RouterChildren';
import { useUserStore } from '../store/UserStore';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'default',
    redirect: './home',
    component: () => import(/* webpackChunkName: "AthenticationSignin" */ '../views/TemplateView.vue'),
    meta: {
      requiresAuth: true,
    },
    children: RouterChildren,
  },

  {
    path: '/sign-in',
    name: 'AthenticationSignin',
    component: () => import(/* webpackChunkName: "AthenticationSignin" */ '../views/Authentication/SigninView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// eslint-disable-next-line consistent-return
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  const getCurrentUser = inject('getCurrentUser') as GetCurrentUser;
  try {
    if (to.meta.requiresAuth) {
      const user = await userStore.currentUser(getCurrentUser);
      if (!user) next({ name: 'AthenticationSignin' });
      next();
    }
    next();
  } catch (err) {
    next({ name: 'AthenticationSignin' });
  }
});

export default router;
