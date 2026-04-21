import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingPage.vue')
    },

    {
      path: '/Artikel2',
      name: 'Artikel_2',
      component: () => import('../views/HomeArtikel2.vue')
    },

    {
      path: '/Artikel3',
      name: 'Artikel_3',
      component: () => import('../views/HomeArtikel3.vue')
    }
  ],
})

export default router
