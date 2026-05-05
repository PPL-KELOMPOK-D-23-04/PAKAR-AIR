import { createRouter, createWebHistory } from 'vue-router'

// =============================================
// 1. IMPORT STORES
// =============================================
import { useAuthStore } from '@/stores/authStore'

// =============================================
// 2. IMPORT LAYOUTS (Sesuai file yang ada)
// =============================================
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DefaultLayoutProfile from '@/layouts/DefaultLayoutProfile.vue'

// =============================================
// 3. IMPORT PUBLIC VIEWS (Landing Page)
// =============================================
import LandingPage from '@/views/public/LandingPage.vue'

// =============================================
// 4. IMPORT EDUKASI VIEWS
// =============================================
import EdukasiView from '@/views/edukasi/EdukasiView.vue'
import HomeArtikel from '@/views/edukasi/HomeArtikel.vue'
import HomeArtikel2 from '@/views/edukasi/HomeArtikel2.vue'
import HomeArtikel3 from '@/views/edukasi/HomeArtikel3.vue'
import SearchView from '@/views/edukasi/SearchView.vue'

// =============================================
// 5. IMPORT DASHBOARD VIEWS (Requires Auth)
// =============================================
import DashboardPage from '@/views/dashboard/DashboardPage.vue'
import AnalysisView from '@/views/dashboard/AnalysisView.vue'
import HistoryView from '@/views/dashboard/HistoryView.vue'
import ProfileView from '@/views/dashboard/ProfileView.vue'
import NotificationsPage from '@/views/dashboard/NotificationsPage.vue'

// =============================================
// 6. DEFINISI ROUTES
// =============================================
const routes = [
  // ========== A. LANDING PAGE ==========
  {
    path: '/',
    name: 'landing',
    component: DefaultLayoutProfile,
    meta: { guestOnly: true, title: 'PAKAR-AIR | Pendeteksi Kualitas Air' },
    children: [
      { path: '', component: LandingPage }
    ]
  },

  // ========== B. AUTHENTICATION ==========
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: { guestOnly: true, title: 'Login | PAKAR-AIR' }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterPage.vue'),
    meta: { guestOnly: true, title: 'Daftar Akun | PAKAR-AIR' }
  },

  // ========== C. DASHBOARD & FITUR UTAMA ==========
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true, title: 'Dashboard | PAKAR-AIR' },
    children: [
      { path: '', component: DashboardPage }
    ]
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: DashboardLayout,
    meta: { requiresAuth: true, title: 'Analisis Air | PAKAR-AIR' },
    children: [
      { path: '', component: AnalysisView }
    ]
  },
  {
    path: '/history',
    alias: ['/riwayat'],
    name: 'history',
    component: DashboardLayout,
    meta: { requiresAuth: true, title: 'Riwayat Analisis | PAKAR-AIR' },
    children: [
      { path: '', component: HistoryView }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: DashboardLayout,
    meta: { requiresAuth: true, title: 'Profil Saya | PAKAR-AIR' },
    children: [
      { path: '', component: ProfileView }
    ]
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: DashboardLayout,
    meta: { requiresAuth: true, title: 'Notifikasi | PAKAR-AIR' },
    children: [
      { path: '', component: NotificationsPage }
    ]
  },

  // ========== D. EDUKASI & ARTIKEL ==========
  {
    path: '/education',
    alias: ['/edukasi'],
    name: 'education',
    component: DefaultLayoutProfile,
    meta: { title: 'Edukasi | PAKAR-AIR' },
    children: [
      { path: '', component: EdukasiView }
    ]
  },
  {
    path: '/artikel',
    name: 'artikel1',
    component: DefaultLayoutProfile,
    meta: { title: 'Parameter Fisik Air | PAKAR-AIR' },
    children: [
      { path: '', component: HomeArtikel }
    ]
  },
  {
    path: '/artikel2',
    name: 'artikel2',
    component: DefaultLayoutProfile,
    meta: { title: 'Dampak Pencemaran Air | PAKAR-AIR' },
    children: [
      { path: '', component: HomeArtikel2 }
    ]
  },
  {
    path: '/artikel3',
    name: 'artikel3',
    component: DefaultLayoutProfile,
    meta: { title: 'Hasil Analisis PAKAR-AIR | PAKAR-AIR' },
    children: [
      { path: '', component: HomeArtikel3 }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: DefaultLayoutProfile,
    meta: { title: 'Pencarian Artikel | PAKAR-AIR' },
    children: [
      { path: '', component: SearchView }
    ]
  },

  // ========== E. ADMIN ROUTES (Opsional) ==========
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, title: 'Admin Panel | PAKAR-AIR' },
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/AdminDashboard.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('@/views/admin/AdminUsers.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'analyses',
        name: 'admin-analyses',
        component: () => import('@/views/admin/AdminAnalyses.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '',
        redirect: { name: 'admin-dashboard' }
      }
    ]
  },

  // ========== F. 404 NOT FOUND ==========
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/errors/NotFoundPage.vue'),
    meta: { title: 'Halaman Tidak Ditemukan | PAKAR-AIR' }
  }
]

// =============================================
// 7. CREATE ROUTER INSTANCE
// =============================================
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// =============================================
// 8. NAVIGATION GUARD
// =============================================
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || 
                localStorage.getItem('pakar_air_token') || 
                sessionStorage.getItem('token')
  
  const isLoggedIn = !!token

  // Cek apakah user admin
  let isAdmin = false
  try {
    const userStr = localStorage.getItem('pakar_air_user') || localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      isAdmin = !!(user.is_admin || user.role === 'admin')
    }
  } catch (error) {
    isAdmin = false
  }

  // Sync dengan auth store
  const authStore = useAuthStore()
  if (isLoggedIn && !authStore.isLoggedIn) {
    authStore.initAuth()
  }

  // RULE 1: Halaman yang butuh login
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ 
      name: 'login', 
      query: { redirect: to.fullPath } 
    })
    return
  }

  // RULE 2: Halaman khusus admin
  if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'dashboard' })
    return
  }

  // RULE 3: Halaman guest-only (login/register)
  if (to.meta.guestOnly && isLoggedIn) {
    const redirectName = isAdmin ? 'admin-dashboard' : 'dashboard'
    next({ name: redirectName })
    return
  }

  next()
})

// =============================================
// 9. SET PAGE TITLE
// =============================================
router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'PAKAR-AIR | Pendeteksi Kualitas Air'
  }
})

export default router