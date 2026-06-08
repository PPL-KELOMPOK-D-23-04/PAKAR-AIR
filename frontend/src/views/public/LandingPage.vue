<template>
  <div class="landing-root">

    <!-- ── Navbar ── -->
    <nav class="navbar">
      <div class="nav-logo">
        <div class="logo-mark">PA</div>
        <span class="logo-text">PAKAR-AIR</span>
      </div>
      <div class="nav-right">
        <a href="#cara-penggunaan" class="nav-link">Panduan</a>
        <template v-if="authStore.isLoggedIn">
          <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
          <button class="nav-btn-danger" @click="handleLogout" :disabled="authStore.isLoading">
            <LogOutIcon size="13" />
            {{ authStore.isLoading ? 'Keluar...' : 'Keluar' }}
          </button>
        </template>
        <template v-else>
          <RouterLink to="/login" id="btn-login-nav" class="nav-link">Masuk</RouterLink>
          <RouterLink to="/login" class="nav-cta">Mulai Gratis</RouterLink>
        </template>
      </div>
    </nav>

    <!-- ── Hero ── -->
    <header class="hero">
      <!-- Left: Copy -->
      <div class="hero-left">
        <div class="hero-eyebrow">
          <span class="eyebrow-dash" />
          Sistem Analisis Kualitas Air — Indonesia
        </div>
        <h1 class="hero-title">
          Kualitas Air<br />
          Terdeteksi<br />
          <strong>Dalam Detik</strong>
        </h1>
        <p class="hero-desc">
          Teknologi AI berbasis gambar untuk mendeteksi kelayakan air secara akurat —
          dari sumur, sungai, hingga PDAM. Tanpa alat laboratorium.
        </p>
        <div class="hero-actions">
          <RouterLink
            :to="authStore.isLoggedIn ? '/dashboard' : '/login'"
            id="btn-start-hero"
            class="btn-primary"
          >
            Mulai Analisis
            <span class="btn-arrow">→</span>
          </RouterLink>
          <a href="#cara-penggunaan" class="btn-ghost">Pelajari Cara Kerja</a>
        </div>
        <div class="hero-specs">
          <div v-for="s in specs" :key="s.label" class="spec-item">
            <div class="spec-num">{{ s.num }}</div>
            <div class="spec-lbl">{{ s.label }}</div>
          </div>
        </div>
      </div>

      <!-- Right: Live sample card -->
      <div class="hero-right">
        <div class="lab-card">
          <div class="lab-card-head">
            <span class="lab-id">SAMPLE-ID · #AQ-20241112-0047</span>
            <span class="lab-status">
              <span class="status-dot" />
              ANALISIS SELESAI
            </span>
          </div>
          <div class="lab-image">
            <div class="lab-scan" />
            <div class="lab-placeholder">
              <DropletIcon size="40" />
            </div>
          </div>
          <div class="lab-params">
            <div v-for="p in sampleParams" :key="p.name" class="param-row">
              <span class="param-name">{{ p.name }}</span>
              <div class="param-track">
                <div class="param-fill" :class="p.good ? '' : 'param-fill--bad'" :style="{ width: p.pct + '%' }" />
              </div>
              <span class="param-val">{{ p.val }}</span>
              <span class="param-tag" :class="p.good ? 'tag-good' : 'tag-bad'">{{ p.tag }}</span>
            </div>
          </div>
          <div class="lab-verdict">
            <span class="verdict-label">VERDIKT AKHIR</span>
            <span class="verdict-text">
              <CheckCircleIcon size="13" />
              LAYAK DIGUNAKAN
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- ── Stats ── -->
    <section class="stats-strip">
      <div v-for="s in stats" :key="s.label" class="stat-cell">
        <div class="stat-num">{{ s.num }}</div>
        <div class="stat-lbl">{{ s.label }}</div>
      </div>
    </section>

    <!-- ── Steps ── -->
    <section id="cara-penggunaan" class="steps-section">
      <div class="section-eyebrow">Cara Penggunaan</div>
      <div class="steps-grid">
        <div v-for="(step, i) in steps" :key="i" class="step-card">
          <div class="step-index">
            <div class="step-index-box">{{ String(i + 1).padStart(2, '0') }}</div>
            {{ step.phase }}
          </div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-desc">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="cta-section">
      <div class="cta-left">
        <p class="cta-eyebrow">Mulai Sekarang</p>
        <h2 class="cta-title">Air Bersih adalah<br /><strong>Hak Semua Orang</strong></h2>
        <p class="cta-desc">
          PAKAR-AIR hadir untuk membantu siapapun — dari petani, ibu rumah tangga, hingga dinas
          lingkungan — mendapatkan akses ke analisis kualitas air yang cepat dan terpercaya.
        </p>
      </div>
      <div class="cta-right">
        <div v-for="f in features" :key="f.title" class="cta-feat">
          <div class="feat-mark">✓</div>
          <p class="feat-text"><strong>{{ f.title }}</strong> {{ f.desc }}</p>
        </div>
        <div class="cta-actions">
          <RouterLink
            :to="authStore.isLoggedIn ? '/dashboard' : '/login'"
            id="btn-cta-bottom"
            class="btn-primary"
          >
            {{ authStore.isLoggedIn ? 'Ke Dashboard' : 'Daftar Gratis' }}
            <span class="btn-arrow">→</span>
          </RouterLink>
          <RouterLink v-if="!authStore.isLoggedIn" to="/login" class="btn-ghost">Masuk</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="footer">
      <span class="footer-copy">© 2026 PAKAR-AIR — Platform Analisis Kualitas Air Indonesia</span>
      <span class="footer-right">Semua hak dilindungi</span>
    </footer>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { DropletIcon, LogOutIcon, CheckCircleIcon, UploadIcon, BeakerIcon } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}

const specs = [
  { num: '98%',    label: 'Akurasi Model' },
  { num: '<3 dtk', label: 'Waktu Analisis' },
  { num: '10K+',   label: 'Analisis Selesai' },
  { num: 'Gratis', label: 'Tanpa Biaya' },
]

const stats = [
  { num: '10K+', label: 'Analisis Dilakukan' },
  { num: '98%',  label: 'Akurasi AI' },
  { num: '24/7', label: 'Tersedia Kapan Saja' },
  { num: '100%', label: 'Gratis Digunakan' },
]

const sampleParams = [
  { name: 'pH',       pct: 72,  val: '7.2',     tag: 'Normal', good: true },
  { name: 'Kekeruhan',pct: 20,  val: '1.8 NTU', tag: 'Jernih', good: true },
  { name: 'Warna',    pct: 10,  val: 'Bening',  tag: 'Baik',   good: true },
  { name: 'Akurasi',  pct: 94,  val: '94%',     tag: 'Tinggi', good: true },
]

const steps = [
  {
    phase: 'LANGKAH PERTAMA',
    title: 'Upload Foto Air',
    desc:  'Ambil foto sampel air dari smartphone Anda. Sistem menerima JPG atau PNG — pencahayaan natural memberikan hasil terbaik.',
  },
  {
    phase: 'LANGKAH KEDUA',
    title: 'Isi Data Pendukung',
    desc:  'Lengkapi informasi warna, bau, sumber air, dan nilai pH jika tersedia. Data ini meningkatkan presisi model AI secara signifikan.',
  },
  {
    phase: 'HASIL',
    title: 'Dapatkan Laporan',
    desc:  'AI menganalisis dan menghasilkan laporan lengkap dengan verdikt kelayakan, parameter kualitas, dan rekomendasi tindakan.',
  },
]

const features = [
  {
    title: 'Tanpa alat laboratorium.',
    desc:  'Cukup kamera smartphone — sistem kami menggantikan tes manual dengan akurasi tinggi.',
  },
  {
    title: 'Riwayat tersimpan.',
    desc:  'Semua hasil analisis tersimpan di dashboard — lacak perubahan kualitas air dari waktu ke waktu.',
  },
  {
    title: 'Laporan bisa diekspor.',
    desc:  'Unduh hasil analisis dalam format PDF untuk keperluan dokumentasi atau pelaporan resmi.',
  },
]
</script>

<style scoped src="@/assets/styles/pages/landing.css"></style>