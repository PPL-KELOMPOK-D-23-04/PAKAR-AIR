import { createRouter, createWebHistory } from 'vue-router'

// layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

// views
import LandingPage from '@/views/LandingPage.vue'
import AnalysisView from '@/views/AnalysisView.vue'

const routes = [
  // Landing
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

  // Dashboard (Analysis)
  {
    path: '/analysis',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Analysis',
        component: AnalysisView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router