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
        <RouterLink to="/analisis" class="nav-item" id="nav-analysis">
          <FlaskConicalIcon class="nav-icon" />
          <span v-show="!sidebarCollapsed">Analisis Air</span>
        </RouterLink>
        <RouterLink to="/riwayat" class="nav-item" id="nav-history">
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
            <RouterLink to="/analisis" id="btn-start-analysis" class="cta-btn">
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

<style scoped>
/* ── Root Layout ──────────────────────────────────────────── */
.dashboard-root {
  display: flex;
  min-height: 100vh;
  background: #f0f4f8;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

/* ── Sidebar ──────────────────────────────────────────────── */
.sidebar {
  width: 240px;
  background: linear-gradient(180deg, #0f172a 0%, #1e3a5f 100%);
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  height: 100vh;
  z-index: 100;
  overflow: hidden;
}
.sidebar-collapsed { width: 72px; }

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  overflow: hidden;
}
.logo-icon {
  width: 2.25rem;
  height: 2.25rem;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}
.logo-text {
  font-weight: 800;
  color: #fff;
  font-size: 1rem;
  white-space: nowrap;
  letter-spacing: -0.3px;
}
.collapse-btn {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 0.35rem;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  transition: background 0.2s, color 0.2s;
  flex-shrink: 0;
}
.collapse-btn:hover { background: rgba(255, 255, 255, 0.15); color: #fff; }
.collapse-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s;
}
.collapse-icon.rotated { transform: rotate(180deg); }

.sidebar-nav {
  flex: 1;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.75rem;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
}
.nav-item:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
.active-item {
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
  border: 1px solid rgba(59, 130, 246, 0.25);
}
.nav-icon { width: 1.1rem; height: 1.1rem; flex-shrink: 0; }

.sidebar-footer {
  padding: 1rem 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.7rem 0.75rem;
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
}
.logout-btn:hover:not(:disabled) { background: rgba(239, 68, 68, 0.25); color: #fecaca; }
.logout-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.logout-spinner { display: flex; align-items: center; }

/* ── Main Wrapper ─────────────────────────────────────────── */
.main-wrapper {
  flex: 1;
  margin-left: 240px;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.sidebar-collapsed ~ .main-wrapper { margin-left: 72px; }

/* ── Topbar ───────────────────────────────────────────────── */
.topbar {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
}
.page-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}
.page-subtitle {
  font-size: 0.8rem;
  color: #64748b;
  margin: 0.15rem 0 0;
}
.page-subtitle strong { color: #1e3a5f; }

.user-badge {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  padding: 0.375rem 1rem 0.375rem 0.375rem;
}
.avatar {
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.875rem;
}
.user-email {
  font-size: 0.8rem;
  color: #475569;
  font-weight: 500;
}

/* ── Main Content ─────────────────────────────────────────── */
.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1100px;
  width: 100%;
}

/* ── Stats ────────────────────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s, transform 0.2s;
}
.stat-card:hover { box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08); transform: translateY(-2px); }
.stat-icon-wrap {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-icon { width: 1.25rem; height: 1.25rem; }
.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
}
.stat-label {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

/* ── CTA Card ─────────────────────────────────────────────── */
.cta-card {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25);
}
.cta-content { max-width: 480px; }
.cta-badge {
  display: inline-block;
  background: rgba(59, 130, 246, 0.25);
  color: #93c5fd;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 50px;
  padding: 0.25rem 0.875rem;
  margin-bottom: 0.875rem;
  border: 1px solid rgba(59, 130, 246, 0.3);
}
.cta-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.625rem;
  letter-spacing: -0.3px;
}
.cta-desc {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}
.cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(59, 130, 246, 0.5); }
.cta-btn-icon { width: 1.1rem; height: 1.1rem; }

/* Water orb animation */
.cta-visual {
  position: relative;
  width: 160px;
  height: 160px;
  flex-shrink: 0;
}
.water-orb {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  animation: pulse-orb 3s ease-in-out infinite;
  z-index: 2;
}
.orb-ring {
  position: absolute;
  border: 1.5px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  animation: expand-ring 3s ease-out infinite;
}
.ring-1 { width: 80px; height: 80px; top: 40px; left: 40px; }
.ring-2 { width: 110px; height: 110px; top: 25px; left: 25px; animation-delay: 0.5s; }
.ring-3 { width: 140px; height: 140px; top: 10px; left: 10px; animation-delay: 1s; }
@keyframes pulse-orb { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
@keyframes expand-ring {
  0%   { opacity: 0.5; transform: scale(0.9); }
  100% { opacity: 0;   transform: scale(1.15); }
}

/* ── Steps ────────────────────────────────────────────────── */
.section-header { margin-bottom: 1rem; }
.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.25rem;
}
.section-sub { font-size: 0.8rem; color: #64748b; margin: 0; }

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.step-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: box-shadow 0.2s, transform 0.2s;
}
.step-card:hover { box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08); transform: translateY(-2px); }
.step-number {
  width: 1.75rem;
  height: 1.75rem;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 0.875rem;
}
.step-icon-wrap {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.875rem;
}
.step-icon { width: 1.35rem; height: 1.35rem; color: #2563eb; }
.step-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.375rem;
}
.step-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

/* ── Modal ────────────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}
.modal-card {
  background: #fff;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  max-width: 360px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}
.modal-icon { font-size: 3rem; margin-bottom: 1rem; }
.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem;
}
.modal-desc {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 1.5rem;
  line-height: 1.5;
}
.modal-actions { display: flex; gap: 0.75rem; }
.modal-cancel {
  flex: 1;
  padding: 0.75rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  background: none;
  color: #475569;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.modal-cancel:hover { background: #f8fafc; }
.modal-confirm {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.modal-confirm:disabled { opacity: 0.6; cursor: not-allowed; }
.modal-confirm:hover:not(:disabled) { opacity: 0.9; }

/* ── Transitions ──────────────────────────────────────────── */
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.25s; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-active .modal-card,
.modal-fade-leave-active .modal-card { transition: transform 0.25s; }
.modal-fade-enter-from .modal-card { transform: scale(0.9); }
.modal-fade-leave-to .modal-card { transform: scale(0.9); }

/* ── Spinners ─────────────────────────────────────────────── */
.spinner-sm {
  width: 0.875rem;
  height: 0.875rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: currentColor;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.7s linear infinite;
}
.spinner-sm.white { border-top-color: #fff; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; }
  .steps-grid { grid-template-columns: 1fr; }
  .cta-card { flex-direction: column; }
  .cta-visual { display: none; }
  .main-content { padding: 1rem; }
  .topbar { padding: 1rem; }
  .user-email { display: none; }
}
</style>
