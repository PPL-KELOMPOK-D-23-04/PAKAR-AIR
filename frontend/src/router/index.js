import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LandingPage from '@/views/public/LandingPage.vue'
import AnalysisView from '@/views/dashboard/AnalysisView.vue'

const routes = [
  // ── Public ──────────────────────────────────────────────────
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

  // ── Auth ─────────────────────────────────────────────────────
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

  // ── User Dashboard ───────────────────────────────────────────
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardPage.vue'),
    meta: { requiresAuth: true, userOnly: true },
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: AnalysisView,
    meta: { requiresAuth: true, userOnly: true },
  },
  {
    path: '/history',
    alias: ['/riwayat'],
    name: 'history',
    component: () => import('@/views/dashboard/HistoryView.vue'),
    meta: { requiresAuth: true, userOnly: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/dashboard/ProfileView.vue'),
    meta: { requiresAuth: true, userOnly: true },
  },

  // ── Edukasi (public) ─────────────────────────────────────────
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

  // ── Admin Panel ──────────────────────────────────────────────
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
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
    ],
  },

  // ── 404 ──────────────────────────────────────────────────────
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/dashboard/DashboardPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ── Navigation Guard ─────────────────────────────────────────────
router.beforeEach((to) => {
  // Baca token & user dari localStorage
  const token = localStorage.getItem('token') || localStorage.getItem('pakar_air_token')

  let isLoggedIn = !!token
  let isAdmin = false

  try {
    const user = JSON.parse(localStorage.getItem('pakar_air_user') || '{}')
    isAdmin = !!user.is_admin
  } catch {
    isAdmin = false
  }

  // Halaman butuh login
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'login' }
  }

  // Halaman khusus admin
  if (to.meta.requiresAdmin && !isAdmin) {
    return { name: 'dashboard' }
  }

  // Halaman khusus user biasa (bukan admin)
  // Admin tetap bisa akses, tapi redirect-nya ke admin dashboard
  if (to.meta.guestOnly && isLoggedIn) {
    return isAdmin ? { name: 'admin-dashboard' } : { name: 'dashboard' }
  }
})

export default router