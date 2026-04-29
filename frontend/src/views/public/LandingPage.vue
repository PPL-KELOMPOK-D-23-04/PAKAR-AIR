<template>
  <div class="landing-root">
    <!-- ── Navbar ── -->
    <nav class="navbar">
      <div class="nav-logo">
        <div class="logo-icon">💧</div>
        <span class="logo-text">PAKAR-AIR</span>
      </div>
      <div class="nav-actions">
        <template v-if="authStore.isLoggedIn">
          <RouterLink to="/dashboard" class="nav-btn nav-btn-outline">Dashboard</RouterLink>
          <button id="btn-logout-nav" class="nav-btn nav-btn-danger" @click="handleLogout" :disabled="authStore.isLoading">
            <LogOutIcon class="btn-icon-sm" />
            {{ authStore.isLoading ? 'Keluar...' : 'Keluar' }}
          </button>
        </template>
        <template v-else>
          <RouterLink to="/login" id="btn-login-nav" class="nav-btn nav-btn-outline">Masuk</RouterLink>
          <RouterLink to="/login" class="btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.875rem; box-shadow: none;">Daftar</RouterLink>
        </template>
      </div>
    </nav>

    <!-- ── Hero ── -->
    <header class="hero">
      <div class="hero-bg-glow glow-1"></div>
      <div class="hero-bg-glow glow-2"></div>
      <div class="hero-content">
        <div class="hero-badge">🔬 Didukung Teknologi AI</div>
        <h1 class="hero-title">Cek Kualitas Air<br /><span class="hero-gradient">dengan Kecerdasan Buatan</span></h1>
        <p class="hero-desc">
          Deteksi kualitas air secara cepat dan akurat menggunakan teknologi AI untuk kesehatan yang lebih baik.
        </p>
        <div class="hero-cta-group">
          <RouterLink :to="authStore.isLoggedIn ? '/dashboard' : '/login'" id="btn-start-hero" class="btn-primary">
            Mulai Analisis <span class="arrow">→</span>
          </RouterLink>
          <a href="#cara-penggunaan" class="btn-ghost">Pelajari Lebih Lanjut</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="float-card card-1">
          <span class="card-icon">✅</span>
          <span>Hasil Instan</span>
        </div>
        <div class="float-card card-2">
          <span class="card-icon">🎯</span>
          <span>Akurasi Tinggi</span>
        </div>
        <div class="water-drop-anim">💧</div>
      </div>
    </header>

    <!-- ── Stats ── -->
    <section class="stats-bar">
      <div class="stat-item" v-for="s in stats" :key="s.label">
        <div class="stat-num">{{ s.num }}</div>
        <div class="stat-lbl">{{ s.label }}</div>
      </div>
    </section>

    <!-- ── Steps ── -->
    <section id="cara-penggunaan" class="steps-section">
      <div class="section-header">
        <h2 class="section-title">Cara Menggunakan</h2>
        <p class="section-sub">Tiga langkah mudah untuk menganalisis kualitas air Anda</p>
      </div>
      <div class="steps-grid">
        <div class="step-card" v-for="(step, i) in steps" :key="i">
          <div class="step-num">{{ i + 1 }}</div>
          <div class="step-icon-wrap">
            <component :is="step.icon" class="step-icon" />
          </div>
          <h3 class="step-card-title">{{ step.title }}</h3>
          <p class="step-card-desc">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="cta-section">
      <div class="cta-box">
        <h2 class="cta-title">Siap Memulai?</h2>
        <p class="cta-desc">Login sekarang dan mulai analisis kualitas air Anda secara gratis.</p>
        <RouterLink :to="authStore.isLoggedIn ? '/dashboard' : '/login'" id="btn-cta-bottom" class="btn-primary">
          {{ authStore.isLoggedIn ? 'Ke Dashboard' : 'Masuk Sekarang' }}
        </RouterLink>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="footer">© 2026 PAKAR-AIR. Semua hak dilindungi.</footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { UploadIcon, BeakerIcon, CheckCircleIcon, LogOutIcon } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}

const stats = [
  { num: '10K+', label: 'Analisis Dilakukan' },
  { num: '98%', label: 'Akurasi AI' },
  { num: '24/7', label: 'Tersedia Kapan Saja' },
  { num: '100%', label: 'Gratis Digunakan' },
]

const steps = [
  { title: 'Upload Foto Air', desc: 'Ambil foto sampel air yang ingin dianalisis langsung dari smartphone Anda.', icon: UploadIcon },
  { title: 'Isi Data Pendukung', desc: 'Lengkapi informasi warna, bau, dan sumber air untuk hasil lebih akurat.', icon: BeakerIcon },
  { title: 'Dapatkan Hasil', desc: 'Sistem AI akan menganalisis dan memberikan rekomendasi kesehatan segera.', icon: CheckCircleIcon },
]
</script>

<style scoped src="@/assets/styles/pages/landing.css"></style>
