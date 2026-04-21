import { createRouter, createWebHistory } from 'vue-router'

// layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

// views
import LandingPage from '@/views/LandingPage.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AnalysisView from '@/views/AnalysisView.vue'
import HistoryView from '@/views/HistoryView.vue'
import EducationView from '@/views/EducationView.vue'
import ProfileView from '@/views/ProfileView.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Landing',
        component: LandingPage
      },
      {
        path: 'education',
        name: 'Education',
        component: EducationView
      }
    ]
  },

  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginView
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterView
      }
    ]
  },

  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: AnalysisView
      },
      {
        path: 'history',
        name: 'History',
        component: HistoryView
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfileView
      }
    ]
  }
]

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
  ]
})

export default router