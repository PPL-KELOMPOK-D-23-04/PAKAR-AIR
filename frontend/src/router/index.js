import { createRouter, createWebHistory } from 'vue-router'

// =============================================
// LAYOUTS
// =============================================
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DefaultLayoutProfile from '@/layouts/DefaultLayoutProfile.vue'

// =============================================
// PUBLIC VIEWS (Halaman yang bisa diakses tanpa login)
// =============================================
import LandingPage from '@/views/public/LandingPage.vue'
import EdukasiView from '@/views/edukasi/EdukasiView.vue'
import HomeArtikel from '@/views/edukasi/HomeArtikel.vue'
import HomeArtikel2 from '@/views/edukasi/HomeArtikel2.vue'
import HomeArtikel3 from '@/views/edukasi/HomeArtikel3.vue'

// =============================================
// DASHBOARD VIEWS (Halaman yang butuh login)
// =============================================
import DashboardPage from '@/views/dashboard/DashboardPage.vue'
import AnalysisView from '@/views/dashboard/AnalysisView.vue'
import HistoryView from '@/views/dashboard/HistoryView.vue'
import ProfileView from '@/views/dashboard/ProfileView.vue'
import NotificationsPage from '@/views/dashboard/NotificationsPage.vue'

// =============================================
// ROUTES
// =============================================
const routes = [
  // LANDING PAGE
  {
    path: '/',
    name: 'Home',
    component: LandingPage
  },

  // AUTH
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterPage.vue')
  },

  // DASHBOARD & FITUR
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardLayout,
    children: [
      { path: '', component: DashboardPage }
    ]
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: DashboardLayout,
    children: [
      { path: '', component: AnalysisView }
    ]
  },
  {
    path: '/history',
    name: 'History',
    component: DashboardLayout,
    children: [
      { path: '', component: HistoryView }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: DashboardLayout,
    children: [
      { path: '', component: ProfileView }
    ]
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: DashboardLayout,
    children: [
      { path: '', component: NotificationsPage }
    ]
  },

  // EDUKASI & ARTIKEL
  {
    path: '/education',
    name: 'Education',
    component: DefaultLayoutProfile,
    children: [
      { path: '', component: EdukasiView }
    ]
  },
  {
    path: '/artikel',
    name: 'Artikel1',
    component: DefaultLayoutProfile,
    children: [
      { path: '', component: HomeArtikel }
    ]
  },
  {
    path: '/artikel2',
    name: 'Artikel2',
    component: DefaultLayoutProfile,
    children: [
      { path: '', component: HomeArtikel2 }
    ]
  },
  {
    path: '/artikel3',
    name: 'Artikel3',
    component: DefaultLayoutProfile,
    children: [
      { path: '', component: HomeArtikel3 }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router