/* eslint-disable */
import { inject } from 'vue';
// import { Route } from 'vue-router';
import { GetUserById } from '@/domain/usecases/user/GetUserById';
import { GetAchievementById } from '@/domain/usecases/user/GetAchievementById';
import { useUserStore } from '@/presentation/store/UserStore';
import Users from './Users';

// eslint-disable-next-line import/prefer-default-export
export const RouterChildren = [
  {
    path: '/home',
    name: 'Home',
    icon: 'mdi-home',
    class: 'text-start',
    show: true,
    component: () => import(/* webpackChunkName: "RouteHome" */ '../presentation/views/HomeView.vue'),
    meta: {
      roles: <Array<number>>[Users.ADMIN, Users.RECEPTION, Users.DOCTOR],
    },
  },
  {
    path: '/user',
    name: 'User',
    icon: 'mdi-account',
    class: 'text-start',
    show: true,
    component: () => import(/* webpackChunkName: "RouteUser" */ '../presentation/views/User/UserDetails.vue'),
    meta: {
      roles: <Array<number>>[Users.ADMIN, Users.RECEPTION, Users.DOCTOR],
    },
  },
  {
    path: '/user/edit/:user_id',
    name: 'UserEdit',
    icon: '',
    class: 'text-start',
    show: false,
    component: () => import(/* webpackChunkName: "RouteUserEdit" */ '../presentation/views/User/EditDetails.vue'),
    meta: {
      roles: <Array<number>>[Users.ADMIN, Users.RECEPTION, Users.DOCTOR],
    },
    // eslint-disable-next-line @typescript-eslint/ban-types
    beforeEnter: async (to: any, from: any, next: Function) => {
      const getUserById = inject('getUserById') as GetUserById;
      const userStore = useUserStore();
      await userStore.getUserById(to.params.user_id, getUserById);
      if (userStore.has_error) next(from.fullPath);

      next();
    },
  },
  {
    path: '/user/achievement/add/:user_id',
    name: 'AchievemtnAdd',
    icon: '',
    class: 'text-start',
    show: false,
    component: () => import(/* webpackChunkName: "RouteAddAchievement" */ '../presentation/views/User/AddAchievements.vue'),
    meta: {
      roles: <Array<number>>[Users.ADMIN, Users.RECEPTION, Users.DOCTOR],
    },
    // eslint-disable-next-line @typescript-eslint/ban-types
    beforeEnter: async (to: any, from: any, next: Function) => {
      const getUserById = inject('getUserById') as GetUserById;
      const userStore = useUserStore();
      await userStore.getUserById(to.params.user_id, getUserById);
      if (userStore.has_error) next(from.fullPath);

      next();
    },
  },
  {
    path: '/user/achievement/edit/:user_id/:achievement_id',
    name: 'AchievemtnEdit',
    icon: '',
    class: 'text-start',
    show: false,
    component: () => import(/* webpackChunkName: "RouteEditAchievement" */ '../presentation/views/User/AddAchievements.vue'),
    meta: {
      roles: <Array<number>>[Users.ADMIN, Users.RECEPTION, Users.DOCTOR],
    },
    // eslint-disable-next-line @typescript-eslint/ban-types
    beforeEnter: async (to: any, from: any, next: Function) => {
      const getAchievementById = inject('getAchievementById') as GetAchievementById;
      const userStore = useUserStore();
      await userStore.getAchievementById(
        to.params.user_id,
        to.params.achievement_id,
        getAchievementById,
      );
      if (userStore.has_error) next(from.fullPath);

      next();
    },
  },
];
