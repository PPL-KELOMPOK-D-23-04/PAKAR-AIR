import { createRouter, createWebHistory } from 'vue-router'

// =============================================
// 1. IMPORT STORES (Untuk Navigation Guard)
// =============================================
import { useAuthStore } from '@/stores/authStore'

// =============================================
// 2. IMPORT LAYOUTS
// =============================================
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// =============================================
// 3. IMPORT PUBLIC VIEWS (Tidak Perlu Login)
// =============================================
import LandingPage from '@/views/public/LandingPage.vue'
import EdukasiView from '@/views/edukasi/EdukasiView.vue'

// =============================================
// 4. IMPORT ARTIKEL VIEWS (Public)
// =============================================
import HomeArtikel from '@/views/edukasi/HomeArtikel.vue'
import HomeArtikel2 from '@/views/edukasi/HomeArtikel2.vue'
import HomeArtikel3 from '@/views/edukasi/HomeArtikel3.vue'

// =============================================
// 5. IMPORT DASHBOARD VIEWS (Perlu Login)
// =============================================
import DashboardPage from '@/views/dashboard/DashboardPage.vue'
import AnalysisView from '@/views/dashboard/AnalysisView.vue'
import HistoryView from '@/views/dashboard/HistoryView.vue'
import ProfileView from '@/views/dashboard/ProfileView.vue'

// =============================================
// 6. IMPORT NOTIFICATIONS & OTHER
// =============================================
import NotificationsPage from '@/views/NotificationsPage.vue'

// =============================================
// 7. DEFINISI ROUTES
// =============================================
const routes = [
  // -------------------------------------------------
  // SECTION A: LANDING PAGE (Tanpa Layout Khusus)
  // -------------------------------------------------
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
    meta: {
      guestOnly: true,
      title: 'PAKAR-AIR | Pendeteksi Kualitas Air Berbasis AI',
      requiresAuth: false
    }
  },

  // -------------------------------------------------
  // SECTION B: AUTHENTICATION (Guest Only)
  // -------------------------------------------------
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: {
      guestOnly: true,
      title: 'Login | PAKAR-AIR',
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterPage.vue'),
    meta: {
      guestOnly: true,
      title: 'Daftar Akun | PAKAR-AIR',
      requiresAuth: false
    }
  },

  // -------------------------------------------------
  // SECTION C: DASHBOARD & FITUR UTAMA (Requires Auth)
  // -------------------------------------------------
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      title: 'Dashboard | PAKAR-AIR'
    },
    children: [
      {
        path: '',
        name: 'dashboard-index',
        component: DashboardPage
      }
    ]
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      title: 'Analisis Kualitas Air | PAKAR-AIR'
    },
    children: [
      {
        path: '',
        name: 'analysis-index',
        component: AnalysisView
      }
    ]
  },
  {
    path: '/history',
    alias: ['/riwayat'],
    name: 'history',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      title: 'Riwayat Analisis | PAKAR-AIR'
    },
    children: [
      {
        path: '',
        name: 'history-index',
        component: HistoryView
      }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      title: 'Profil Saya | PAKAR-AIR'
    },
    children: [
      {
        path: '',
        name: 'profile-index',
        component: ProfileView
      }
    ]
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      title: 'Notifikasi | PAKAR-AIR'
    },
    children: [
      {
        path: '',
        name: 'notifications-index',
        component: NotificationsPage
      }
    ]
  },

  // -------------------------------------------------
  // SECTION D: EDUKASI & ARTIKEL (Public Access)
  // -------------------------------------------------
  {
    path: '/education',
    alias: ['/edukasi'],
    name: 'education',
    component: DefaultLayout,
    meta: {
      title: 'Edukasi Kualitas Air | PAKAR-AIR',
      requiresAuth: false
    },
    children: [
      {
        path: '',
        name: 'education-index',
        component: EdukasiView
      }
    ]
  },
  {
    path: '/artikel',
    name: 'artikel1',
    component: DefaultLayout,
    meta: {
      title: 'Parameter Fisik Air Layak Konsumsi | PAKAR-AIR',
      requiresAuth: false
    },
    children: [
      {
        path: '',
        name: 'artikel1-index',
        component: HomeArtikel
      }
    ]
  },
  {
    path: '/artikel2',
    name: 'artikel2',
    component: DefaultLayout,
    meta: {
      title: 'Dampak Pencemaran Air | PAKAR-AIR',
      requiresAuth: false
    },
    children: [
      {
        path: '',
        name: 'artikel2-index',
        component: HomeArtikel2
      }
    ]
  },
  {
    path: '/artikel3',
    name: 'artikel3',
    component: DefaultLayout,
    meta: {
      title: 'Memahami Hasil Analisis PAKAR-AIR | PAKAR-AIR',
      requiresAuth: false
    },
    children: [
      {
        path: '',
        name: 'artikel3-index',
        component: HomeArtikel3
      }
    ]
  },

  // -------------------------------------------------
  // SECTION E: SEARCH PAGE (Optional)
  // -------------------------------------------------
  {
    path: '/search',
    name: 'search',
    component: DefaultLayout,
    meta: {
      title: 'Pencarian Artikel | PAKAR-AIR',
      requiresAuth: false
    },
    children: [
      {
        path: '',
        name: 'search-index',
        component: () => import('@/views/edukasi/SearchView.vue')
      }
    ]
  },

  // -------------------------------------------------
  // SECTION F: 404 NOT FOUND (Harus Paling Akhir)
  // -------------------------------------------------
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/errors/NotFoundPage.vue'),
    meta: {
      title: 'Halaman Tidak Ditemukan | PAKAR-AIR',
      requiresAuth: false
    }
  }
]

// =============================================
// 8. CREATE ROUTER INSTANCE
// =============================================
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Smooth scroll ke hash jika ada
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // Kembali ke posisi sebelumnya jika ada
    if (savedPosition) {
      return savedPosition
    }
    // Default: scroll ke atas
    return { top: 0 }
  }
})

// =============================================
// 9. NAVIGATION GUARD (BEFORE EACH ROUTE)
// =============================================
router.beforeEach((to, from, next) => {
  // Ambil token dari berbagai kemungkinan storage
  const token = localStorage.getItem('token') || 
                localStorage.getItem('pakar_air_token') || 
                sessionStorage.getItem('token')
  
  const isLoggedIn = !!token

  // Ambil data user untuk cek role admin
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

  // ========== RULE 1: Halaman yang butuh login ==========
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ 
      name: 'login', 
      query: { redirect: to.fullPath } 
    })
    return
  }

  // ========== RULE 2: Halaman khusus admin ==========
  if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'dashboard' })
    return
  }

  // ========== RULE 3: Halaman guest-only (login/register) ==========
  // Jika sudah login, redirect ke dashboard yang sesuai
  if (to.meta.guestOnly && isLoggedIn) {
    const redirectName = isAdmin ? 'admin-dashboard' : 'dashboard'
    next({ name: redirectName })
    return
  }

  // ========== RULE 4: Lanjutkan ==========
  next()
})

// =============================================
// 10. AFTER EACH ROUTE (Set Page Title)
// =============================================
router.afterEach((to) => {
  // Set judul halaman dari meta
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'PAKAR-AIR | Pendeteksi Kualitas Air Berbasis AI'
  }

  // Scroll ke atas untuk mobile (opsional)
  if (window.scrollY > 0) {
    window.scrollTo(0, 0)
  }
})

// =============================================
// 11. EXPORT ROUTER
// =============================================
export default router