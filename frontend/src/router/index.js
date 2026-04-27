import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LandingPage from '@/views/LandingPage.vue'
import AnalysisView from '@/views/AnalysisView.vue'

const routes = [
  // Landing (DefaultLayout handles its own chrome)
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Landing',
        component: LandingPage,
      },
    ],
  },

  // Analysis — DashboardLayout is wrapped directly inside AnalysisView
  {
    path: '/analysis',
    name: 'Analysis',
    component: AnalysisView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router