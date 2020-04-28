export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      requireAuth: false,
      keepAlive: false
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
  },
  { path: '*', redirect: '/404' }
]
