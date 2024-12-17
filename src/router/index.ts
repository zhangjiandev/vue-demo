// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import Layout from '@/layouts/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: '用户管理' }
      }
    ]
  },
  {
    path: '/demos',
    component: Layout,
    meta: { title: 'demos' },
    children: [
      {
        path: 'dragAndDrop',
        name: 'dragAndDrop',
        component: () => import('@/views/demos/dragAndDrop/index.vue'),
        meta: { title: 'dragAndDrop' }
      },
      {
        path: 'map',
        name: 'map',
        component: () => import('@/views/demos/map/index.vue'),
        meta: { title: 'map' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
