import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LandingPage from '@/views/public/LandingPage.vue'
import AnalysisView from '@/views/dashboard/AnalysisView.vue'

const routes = [
  // Landing
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'landing',
        component: LandingPage,
      },
    ],
  },

  // Auth & Dashboard
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardPage.vue'),
    meta: { requiresAuth: true },
  },
  // Analysis
  {
    path: '/analysis',
    name: 'analysis',
    component: AnalysisView,
    meta: { requiresAuth: true },
  },
  // History
  {
    path: '/history',
    alias: ['/riwayat'],
    name: 'history',
    component: () => import('@/views/dashboard/HistoryView.vue'),
    meta: { requiresAuth: true },
  },
  // Edukasi & Artikel
  {
    path: '/education',
    alias: ['/edukasi'],
    name: 'education',
    component: () => import('@/views/edukasi/EdukasiView.vue'),
  },
  {
    path: '/artikel',
    name: 'artikel1',
    component: () => import('@/views/edukasi/HomeArtikel.vue'),
  },
  {
    path: '/artikel2',
    name: 'artikel2',
    component: () => import('@/views/edukasi/HomeArtikel2.vue'),
  },
  {
    path: '/artikel3',
    name: 'artikel3',
    component: () => import('@/views/edukasi/HomeArtikel3.vue'),
  },
  // Profile
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/dashboard/ProfileView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation Guard
// router.beforeEach((to) => {
//   const authStore = useAuthStore()

//   authStore.initAuth()

//   if (to.meta.requiresAuth && !authStore.isLoggedIn) {
//     return { name: 'login' }
//   }

//   if (to.meta.guestOnly && authStore.isLoggedIn) {
//     return { name: 'dashboard' }
//   }
// })

export default router