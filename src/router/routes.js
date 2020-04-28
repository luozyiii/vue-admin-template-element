import Layout from '@/components/layout/Layout.vue'
export default [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        meta: {
          requireAuth: true,
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'Test',
    component: Layout,
    children: [
      {
        path: 'test',
        name: 'Test',
        meta: {
          requireAuth: true,
          keepAlive: true // 需要缓存
        },
        component: () => import(/* webpackChunkName: "test" */ '@/views//test/Test.vue')
      }
    ]
  }
]
