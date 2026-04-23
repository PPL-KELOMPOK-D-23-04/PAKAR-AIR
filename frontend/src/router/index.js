import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardPage.vue'),
      meta: { requiresAuth: true },
    },
    {
    path: '/edukasi',
    name: 'Edukasi',
    component: () => import('../views/EdukasiView.vue')
    },
    {
      path: '/artikel',
      name: 'Artikel1',
      component: () => import('../views/HomeArtikel.vue')
    },
    {
      path: '/artikel2',
      name: 'Artikel2',
      component: () => import('../views/HomeArtikel2.vue')
    },
    {
      path: '/artikel3',
      name: 'Artikel3',
      component: () => import('../views/HomeArtikel3.vue')
    },
    // ========== HALAMAN PROFILE ==========
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue')
    }
  ]

    
  })

// Navigation Guard
router.beforeEach((to) => {
  const authStore = useAuthStore()

  // Initialize auth (set axios header if token exists)
  authStore.initAuth()

  // Route requires login → redirect to /login
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'login' }
  }

  // Route is guest-only (e.g. login) → redirect to dashboard if already logged in
  if (to.meta.guestOnly && authStore.isLoggedIn) {
    return { name: 'dashboard' }
  }
})

export default router
