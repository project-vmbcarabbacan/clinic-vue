// eslint-disable-next-line import/prefer-default-export
export const RouterChildren = [
  {
    path: '/home',
    name: 'Home',
    icon: 'mdi-home',
    class: 'text-start',
    component: () => import(/* webpackChunkName: "AthenticationSignin" */ '../presentation/views/HomeView.vue'),
  },
  {
    path: '/user',
    name: 'User',
    icon: 'mdi-account',
    class: 'text-start',
    component: () => import(/* webpackChunkName: "AthenticationSignin" */ '../presentation/views/User/UserDetails.vue'),
  },
];
