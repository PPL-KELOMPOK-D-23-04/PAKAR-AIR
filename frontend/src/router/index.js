import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LandingPage from '@/views/public/LandingPage.vue'
import AnalysisView from '@/views/dashboard/AnalysisView.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import ProfileView from '@/views/dashboard/ProfileView.vue'
import NotificationView from '@/views/dashboard/NotificationView.vue'

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
  // Auth & Dashboard
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterPage.vue'),
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
  {
    path: '/dashboard/history/:id',
    name: 'history-detail',
    component: () => import('@/views/dashboard/HistoryDetailView.vue'),
    meta: { requiresAuth: true },
  },
  // Edukasi & Artikel (Wrapped in DefaultLayout)
  {
    path: '/edukasi-layout',
    component: DefaultLayout,
    children: [
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
    ],
  },
  // Profile
{
  path: '/profile',
  name: 'profile',
  component: ProfileView,
  meta: { requiresAuth: true },
},
  // Notifications
{
  path: '/notifications',
  name: 'notifications',
  component: NotificationView,
  meta: { requiresAuth: true },
},
  // Admin Panel
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
  const token = sessionStorage.getItem('token') || sessionStorage.getItem('pakar_air_token')
  const isLoggedIn = !!token

  let isAdmin = false
  try {
    const user = JSON.parse(sessionStorage.getItem('pakar_air_user') || '{}')
    isAdmin = !!user.is_admin
  } catch {
    isAdmin = false
  }

  // Halaman yang butuh login
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'login' }
  }

  // Halaman khusus admin — user biasa tidak boleh masuk
  if (to.meta.requiresAdmin && !isAdmin) {
    return { name: 'dashboard' }
  }

  // Halaman guest-only (login/register) — jika sudah login, redirect
  if (to.meta.guestOnly && isLoggedIn) {
    return isAdmin ? { name: 'admin-dashboard' } : { name: 'dashboard' }
  }
})

export default router