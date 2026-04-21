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
  // 🌐 PUBLIC
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

  // 🔐 AUTH
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

  // 📊 USER DASHBOARD
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
  history: createWebHistory(),
  routes
})

export default router