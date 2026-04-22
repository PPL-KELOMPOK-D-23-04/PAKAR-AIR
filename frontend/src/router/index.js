import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: () => import('../views/LandingPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue')
  },
  // ========== HALAMAN EDUKASI & ARTIKEL ==========
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

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router