import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LandingPage from '@/views/public/LandingPage.vue'
import AnalysisView from '@/views/dashboard/AnalysisView.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

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

  // Auth
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterPage.vue'),
    meta: { guestOnly: true },
  },

  // Dashboard
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

  // Education
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

  // Admin
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/AdminDashboard.vue'),
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('@/views/admin/AdminUsers.vue'),
      },
      {
        path: 'reports',
        name: 'admin-reports',
        component: () => import('@/views/admin/AdminReports.vue'),
      },
      {
        path: 'chatbot',
        name: 'admin-chatbot',
        component: () => import('@/views/admin/AdminChatbot.vue'),
      },
    ],
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

  const isLoggedIn = authStore.isLoggedIn
  const isAdmin = authStore.currentUser?.is_admin || false

  // Butuh login
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'login' }
  }

  // Khusus admin
  if (to.meta.requiresAdmin && !isAdmin) {
    return { name: 'dashboard' }
  }

  // Guest only
  if (to.meta.guestOnly && isLoggedIn) {
    return isAdmin
      ? { name: 'admin-dashboard' }
      : { name: 'dashboard' }
  }
})

export default router