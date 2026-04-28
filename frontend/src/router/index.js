import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LandingPage from '@/views/LandingPage.vue'
import AnalysisView from '@/views/AnalysisView.vue'

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
    component: () => import('@/views/LoginPage.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardPage.vue'),
    meta: { requiresAuth: true },
  },

  // Analysis (pakai view lu)
  {
    path: '/analysis',
    name: 'analysis',
    component: AnalysisView,
    meta: { requiresAuth: true },
  },

  // Edukasi & Artikel
  {
    path: '/edukasi',
    name: 'edukasi',
    component: () => import('@/views/EdukasiView.vue'),
  },
  {
    path: '/artikel',
    name: 'artikel1',
    component: () => import('@/views/HomeArtikel.vue'),
  },
  {
    path: '/artikel2',
    name: 'artikel2',
    component: () => import('@/views/HomeArtikel2.vue'),
  },
  {
    path: '/artikel3',
    name: 'artikel3',
    component: () => import('@/views/HomeArtikel3.vue'),
  },

  // Profile
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation Guard
router.beforeEach((to) => {
  const authStore = useAuthStore()

  authStore.initAuth()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'login' }
  }

  if (to.meta.guestOnly && authStore.isLoggedIn) {
    return { name: 'dashboard' }
  }
})

export default router