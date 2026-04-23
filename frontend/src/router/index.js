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
      path: '/Artikel2',
      name: 'Artikel_2',
      component: () => import('../views/HomeArtikel2.vue'),
    },
    {
      path: '/Artikel3',
      name: 'Artikel_3',
      component: () => import('../views/HomeArtikel3.vue'),
    },

    // ─── Admin Routes (PKD20TP-9) ──────────────────────────────
    {
      path: '/admin/users',
      name: 'adminUsers',
      component: () => import('../views/admin/AdminUsers.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
})

// ─── Navigation Guard ──────────────────────────────────────────
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

  // Route requires admin → redirect to dashboard if not admin
  if (to.meta.requiresAdmin && !authStore.currentUser?.is_admin) {
    return { name: 'dashboard' }
  }
})

export default router
