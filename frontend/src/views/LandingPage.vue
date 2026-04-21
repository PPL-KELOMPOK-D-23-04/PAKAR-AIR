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

<style scoped>
.landing-root {
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  background: #f8fafc;
  color: #0f172a;
}

/* ── Navbar ──────────────────────────────────────────────── */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 3rem;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.logo-icon {
  width: 2.25rem; height: 2.25rem;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(59,130,246,0.4);
}
.logo-text {
  font-size: 1.1rem; font-weight: 800; color: #fff; letter-spacing: -0.3px;
}
.nav-actions { display: flex; align-items: center; gap: 0.75rem; }
.nav-btn {
  display: inline-flex; align-items: center; gap: 0.375rem;
  padding: 0.5rem 1.25rem; border-radius: 10px;
  font-size: 0.875rem; font-weight: 600;
  cursor: pointer; text-decoration: none; transition: all 0.2s;
  border: none;
}
.nav-btn-outline {
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.15);
}
.nav-btn-outline:hover { background: rgba(255,255,255,0.15); color: #fff; }
.nav-btn-danger {
  background: rgba(239,68,68,0.15);
  color: #fca5a5;
  border: 1px solid rgba(239,68,68,0.25);
}
.nav-btn-danger:hover:not(:disabled) { background: rgba(239,68,68,0.25); color: #fecaca; }
.nav-btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-icon-sm { width: 0.875rem; height: 0.875rem; }

/* ── Hero ────────────────────────────────────────────────── */
.hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0c2d5a 100%);
  padding: 5rem 3rem 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  position: relative;
  overflow: hidden;
}
.hero-bg-glow {
  position: absolute; border-radius: 50%;
  filter: blur(100px); opacity: 0.15;
}
.glow-1 {
  width: 500px; height: 500px;
  background: #3b82f6;
  top: -200px; left: -100px;
}
.glow-2 {
  width: 400px; height: 400px;
  background: #06b6d4;
  bottom: -150px; right: 100px;
}
.hero-content { max-width: 560px; position: relative; z-index: 2; }
.hero-badge {
  display: inline-block;
  background: rgba(59,130,246,0.2);
  border: 1px solid rgba(59,130,246,0.35);
  color: #93c5fd;
  font-size: 0.8rem; font-weight: 600;
  border-radius: 50px; padding: 0.375rem 1rem;
  margin-bottom: 1.25rem;
}
.hero-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900; color: #fff;
  line-height: 1.15; margin: 0 0 1rem;
  letter-spacing: -0.5px;
}
.hero-gradient {
  background: linear-gradient(90deg, #60a5fa, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-desc {
  color: rgba(255,255,255,0.6); font-size: 1rem;
  line-height: 1.7; margin-bottom: 2rem;
}
.hero-cta-group { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff; padding: 0.875rem 2rem;
  border-radius: 12px; font-weight: 700; font-size: 0.95rem;
  text-decoration: none; cursor: pointer;
  box-shadow: 0 8px 20px rgba(59,130,246,0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(59,130,246,0.5); }
.arrow { font-size: 1.1rem; }
.btn-ghost {
  color: rgba(255,255,255,0.55); font-size: 0.9rem;
  text-decoration: none; font-weight: 500;
  transition: color 0.2s;
}
.btn-ghost:hover { color: #fff; }

/* Hero Visual */
.hero-visual {
  position: relative; width: 260px; height: 260px;
  flex-shrink: 0; z-index: 2;
}
.water-drop-anim {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 7rem;
  animation: float-drop 3s ease-in-out infinite;
}
@keyframes float-drop {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-16px); }
}
.float-card {
  position: absolute;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 12px; padding: 0.5rem 0.875rem;
  color: #fff; font-size: 0.8rem; font-weight: 600;
  display: flex; align-items: center; gap: 0.375rem;
  animation: float-drop 3s ease-in-out infinite;
}
.card-1 { top: 20px; left: -10px; animation-delay: 0.5s; }
.card-2 { bottom: 30px; right: -10px; animation-delay: 1s; }
.card-icon { font-size: 1rem; }

/* ── Stats ────────────────────────────────────────────────── */
.stats-bar {
  display: grid; grid-template-columns: repeat(4, 1fr);
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}
.stat-item {
  padding: 1.75rem 1rem; text-align: center;
  border-right: 1px solid #e2e8f0;
  transition: background 0.2s;
}
.stat-item:last-child { border-right: none; }
.stat-item:hover { background: #f8fafc; }
.stat-num {
  font-size: 1.75rem; font-weight: 900;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.stat-lbl { font-size: 0.8rem; color: #64748b; margin-top: 0.25rem; font-weight: 500; }

/* ── Steps ────────────────────────────────────────────────── */
.steps-section {
  max-width: 1000px; margin: 0 auto;
  padding: 5rem 2rem;
}
.section-header { text-align: center; margin-bottom: 3rem; }
.section-title { font-size: 2rem; font-weight: 800; margin: 0 0 0.5rem; letter-spacing: -0.3px; }
.section-sub { color: #64748b; font-size: 1rem; }
.steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.step-card {
  background: #fff; border: 1px solid #e2e8f0;
  border-radius: 20px; padding: 2rem;
  text-align: center;
  transition: box-shadow 0.2s, transform 0.2s;
}
.step-card:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.08); transform: translateY(-4px); }
.step-num {
  width: 1.75rem; height: 1.75rem;
  background: #eff6ff; color: #2563eb;
  border-radius: 8px; font-size: 0.8rem; font-weight: 800;
  display: inline-flex; align-items: center; justify-content: center;
  margin-bottom: 1rem;
}
.step-icon-wrap {
  width: 3.5rem; height: 3.5rem;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
}
.step-icon { width: 1.5rem; height: 1.5rem; color: #2563eb; }
.step-card-title { font-size: 1.05rem; font-weight: 700; margin: 0 0 0.5rem; }
.step-card-desc { font-size: 0.85rem; color: #64748b; line-height: 1.6; margin: 0; }

/* ── CTA ─────────────────────────────────────────────────── */
.cta-section { padding: 0 2rem 5rem; }
.cta-box {
  max-width: 700px; margin: 0 auto;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
  border-radius: 24px; padding: 3.5rem 2.5rem;
  text-align: center;
  box-shadow: 0 20px 50px rgba(15,23,42,0.2);
}
.cta-title { font-size: 2rem; font-weight: 800; color: #fff; margin: 0 0 0.75rem; }
.cta-desc { color: rgba(255,255,255,0.55); margin-bottom: 1.75rem; font-size: 0.95rem; }

/* ── Footer ──────────────────────────────────────────────── */
.footer {
  text-align: center; padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  font-size: 0.8rem; color: #94a3b8;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 768px) {
  .navbar { padding: 1rem; }
  .hero { flex-direction: column; padding: 3rem 1.5rem; text-align: center; }
  .hero-visual { display: none; }
  .stats-bar { grid-template-columns: repeat(2, 1fr); }
  .steps-grid { grid-template-columns: 1fr; }
  .hero-cta-group { justify-content: center; }
}
</style>