import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LandingPage from '@/views/public/LandingPage.vue'
import AnalysisView from '@/views/dashboard/AnalysisView.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const routes = [
  // ========== LANDING PAGE ==========
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

  // ========== AUTHENTICATION ==========
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

  // ========== USER DASHBOARD ==========
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardPage.vue'),
    meta: { requiresAuth: true },
  },

  // ========== ANALYSIS ==========
  {
    path: '/analysis',
    name: 'analysis',
    component: AnalysisView,
    meta: { requiresAuth: true },
  },

  // ========== HISTORY ==========
  {
    path: '/history',
    alias: ['/riwayat'],
    name: 'history',
    component: () => import('@/views/dashboard/HistoryView.vue'),
    meta: { requiresAuth: true },
  },

  // ========== PROFILE ==========
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/dashboard/ProfileView.vue'),
    meta: { requiresAuth: true },
  },

  // ========== NOTIFICATIONS ==========
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import('@/views/NotificationsPage.vue'),
    meta: { requiresAuth: true },
  },

  // ========== EDUKASI & ARTIKEL ==========
  {
    path: '/education',
    alias: ['/edukasi'],
    name: 'education',
    component: () => import('@/views/edukasi/EdukasiView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/artikel',
    name: 'artikel1',
    component: () => import('@/views/edukasi/HomeArtikel.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/artikel2',
    name: 'artikel2',
    component: () => import('@/views/edukasi/HomeArtikel2.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/artikel3',
    name: 'artikel3',
    component: () => import('@/views/edukasi/HomeArtikel3.vue'),
    meta: { requiresAuth: false },
  },

  // ========== ADMIN ROUTES ==========
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/AdminDashboard.vue'),
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('@/views/admin/AdminUsers.vue'),
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'analyses',
        name: 'admin-analyses',
        component: () => import('@/views/admin/AdminAnalyses.vue'),
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'reports',
        name: 'admin-reports',
        component: () => import('@/views/admin/AdminReports.vue'),
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'education',
        name: 'admin-education',
        component: () => import('@/views/admin/AdminEducation.vue'),
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: '',
        redirect: { name: 'admin-dashboard' },
      },
    ],
  },

  // ========== ERROR PAGE (404) ==========
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/errors/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// ========== NAVIGATION GUARD ==========
router.beforeEach((to, from, next) => {
  // Ambil token dari berbagai kemungkinan storage
  const token = localStorage.getItem('token') || 
                localStorage.getItem('pakar_air_token') || 
                sessionStorage.getItem('token')
  
  const isLoggedIn = !!token

  // Ambil user data dari localStorage
  let isAdmin = false
  let userData = null
  try {
    const user = JSON.parse(localStorage.getItem('pakar_air_user') || '{}')
    userData = user
    isAdmin = !!user.is_admin || user.role === 'admin'
  } catch {
    isAdmin = false
  }

  // Update auth store jika perlu
  const authStore = useAuthStore()
  if (isLoggedIn && !authStore.isLoggedIn) {
    authStore.initAuth()
  }

  // 1. Halaman yang butuh login
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ 
      name: 'login', 
      query: { redirect: to.fullPath } 
    })
    return
  }

  // 2. Halaman khusus admin
  if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'dashboard' })
    return
  }

  // 3. Halaman guest-only (login/register) - jika sudah login, redirect ke dashboard
  if (to.meta.guestOnly && isLoggedIn) {
    const redirectTo = isAdmin ? 'admin-dashboard' : 'dashboard'
    next({ name: redirectTo })
    return
  }

  // 4. Semua kondisi terpenuhi
  next()
})

// ========== AFTER EACH (Analytics, Page Title, dll) ==========
router.afterEach((to) => {
  // Set page title
  const pageTitle = {
    landing: 'PAKAR-AIR | Pendeteksi Kualitas Air',
    login: 'Login | PAKAR-AIR',
    register: 'Daftar | PAKAR-AIR',
    dashboard: 'Dashboard | PAKAR-AIR',
    analysis: 'Analisis Air | PAKAR-AIR',
    history: 'Riwayat Analisis | PAKAR-AIR',
    profile: 'Profil Saya | PAKAR-AIR',
    notifications: 'Notifikasi | PAKAR-AIR',
    education: 'Edukasi | PAKAR-AIR',
    'admin-dashboard': 'Admin Dashboard | PAKAR-AIR',
    'admin-users': 'Kelola Pengguna | PAKAR-AIR',
    'admin-analyses': 'Kelola Analisis | PAKAR-AIR',
    'admin-reports': 'Laporan | PAKAR-AIR',
    'not-found': 'Halaman Tidak Ditemukan | PAKAR-AIR',
  }
  
  const title = pageTitle[to.name] || 'PAKAR-AIR | Pendeteksi Kualitas Air Berbasis AI'
  document.title = title
})

export default router