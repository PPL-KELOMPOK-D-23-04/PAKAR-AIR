<template>
  <div class="dashboard-root">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="logo-icon">💧</div>
          <span class="logo-text" v-show="!sidebarCollapsed">PAKAR-AIR</span>
        </div>
        <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed" aria-label="Toggle Sidebar">
          <ChevronLeftIcon class="collapse-icon" :class="{ 'rotated': sidebarCollapsed }" />
        </button>
      </div>

      <nav class="sidebar-nav">
        <RouterLink to="/dashboard" class="nav-item active-item" id="nav-dashboard">
          <LayoutDashboardIcon class="nav-icon" />
          <span v-show="!sidebarCollapsed">Dashboard</span>
        </RouterLink>
        <RouterLink to="/analysis" class="nav-item" id="nav-analysis">
          <FlaskConicalIcon class="nav-icon" />
          <span v-show="!sidebarCollapsed">Analisis Air</span>
        </RouterLink>
        <RouterLink to="/history" class="nav-item" id="nav-history">
          <HistoryIcon class="nav-icon" />
          <span v-show="!sidebarCollapsed">Riwayat</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <button id="btn-logout" class="logout-btn" @click="handleLogout" :disabled="authStore.isLoading">
          <span v-if="authStore.isLoading" class="logout-spinner">
            <span class="spinner-sm"></span>
          </span>
          <LogOutIcon v-else class="nav-icon" />
          <span v-show="!sidebarCollapsed">{{ authStore.isLoading ? 'Keluar...' : 'Keluar' }}</span>
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div class="main-wrapper">
      <!-- Topbar -->
      <header class="topbar">
        <div class="topbar-left">
          <h1 class="page-title">Dashboard</h1>
          <p class="page-subtitle">Selamat datang, <strong>{{ userDisplayName }}</strong>!</p>
        </div>
        <div class="topbar-right">
          <div class="user-badge">
            <div class="avatar">{{ userInitial }}</div>
            <span class="user-email">{{ authStore.currentUser?.email }}</span>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="main-content">
        <!-- Stats row -->
        <div class="stats-grid">
          <div class="stat-card" v-for="stat in stats" :key="stat.label">
            <div class="stat-icon-wrap" :style="{ background: stat.bg }">
              <component :is="stat.icon" class="stat-icon" :style="{ color: stat.color }" />
            </div>
            <div>
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- CTA card -->
        <div class="cta-card">
          <div class="cta-content">
            <div class="cta-badge">✨ Siap Digunakan</div>
            <h2 class="cta-title">Mulai Analisis Kualitas Air</h2>
            <p class="cta-desc">
              Upload foto sampel air dan isi data pendukung untuk mendapatkan hasil analisis AI yang akurat dan rekomendasi kesehatan secara instan.
            </p>
            <RouterLink to="/analysis" id="btn-start-analysis" class="cta-btn">
              <FlaskConicalIcon class="cta-btn-icon" />
              Mulai Analisis Sekarang
            </RouterLink>
          </div>
          <div class="cta-visual">
            <div class="water-orb">💧</div>
            <div class="orb-ring ring-1"></div>
            <div class="orb-ring ring-2"></div>
            <div class="orb-ring ring-3"></div>
          </div>
        </div>

        <!-- How it works -->
        <div class="section-header">
          <h2 class="section-title">Cara Penggunaan</h2>
          <p class="section-sub">Tiga langkah mudah untuk menganalisis air Anda</p>
        </div>
        <div class="steps-grid">
          <div class="step-card" v-for="(step, i) in steps" :key="i">
            <div class="step-number">{{ i + 1 }}</div>
            <div class="step-icon-wrap">
              <component :is="step.icon" class="step-icon" />
            </div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </main>
    </div>

    <!-- Logout Confirm Modal -->
    <Transition name="modal-fade">
      <div v-if="showLogoutModal" class="modal-overlay" @click.self="showLogoutModal = false">
        <div class="modal-card">
          <div class="modal-icon">👋</div>
          <h3 class="modal-title">Keluar dari Akun?</h3>
          <p class="modal-desc">Anda akan keluar dari sesi ini. Pastikan data Anda sudah tersimpan.</p>
          <div class="modal-actions">
            <button class="modal-cancel" @click="showLogoutModal = false">Batal</button>
            <button id="btn-confirm-logout" class="modal-confirm" @click="confirmLogout" :disabled="authStore.isLoading">
              <span v-if="authStore.isLoading">
                <span class="spinner-sm white"></span> Keluar...
              </span>
              <span v-else>Ya, Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  LayoutDashboardIcon,
  FlaskConicalIcon,
  HistoryIcon,
  LogOutIcon,
  ChevronLeftIcon,
  DropletIcon,
  ClipboardCheckIcon,
  UploadIcon,
  BeakerIcon,
  CheckCircleIcon,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const sidebarCollapsed = ref(false)
const showLogoutModal = ref(false)

const userDisplayName = computed(() => {
  const user = authStore.currentUser
  return user?.full_name || user?.email?.split('@')[0] || 'Pengguna'
})
const userInitial = computed(() => userDisplayName.value.charAt(0).toUpperCase())

const stats = [
  { label: 'Total Analisis', value: '0', icon: FlaskConicalIcon, bg: 'rgba(59,130,246,0.1)', color: '#3b82f6' },
  { label: 'Air Aman', value: '0', icon: DropletIcon, bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
  { label: 'Perlu Perhatian', value: '0', icon: ClipboardCheckIcon, bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
]

const steps = [
  { title: 'Upload Foto Air', desc: 'Ambil foto sampel air langsung dari kamera atau galeri.', icon: UploadIcon },
  { title: 'Isi Data Pendukung', desc: 'Lengkapi info warna, bau, dan sumber air untuk akurasi lebih tinggi.', icon: BeakerIcon },
  { title: 'Dapatkan Hasil Instan', desc: 'AI menganalisis dan memberikan rekomendasi kesehatan.', icon: CheckCircleIcon },
]

function handleLogout() {
  showLogoutModal.value = true
}

async function confirmLogout() {
  await authStore.logout()
  router.push('/')
}
</script>

<style scoped src="@/assets/styles/pages/dashboard.css"></style>
