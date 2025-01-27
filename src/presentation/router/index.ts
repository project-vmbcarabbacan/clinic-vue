import { inject } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { GetCurrentUser } from '@/domain/usecases/user/GetCurrentUser';
import { useUserStore } from '../store/UserStore';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
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
  const user = await userStore.currentUser(getCurrentUser);
  next();
});

export default router;
