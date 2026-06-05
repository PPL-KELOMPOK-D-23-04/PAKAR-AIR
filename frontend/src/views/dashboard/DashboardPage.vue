<template>
  <DashboardLayout>
    <div class="dashboard-page">

      <!-- Ambient background orbs -->
      <div class="bg-orbs" aria-hidden="true">
        <div class="bg-orb bg-orb--1"></div>
        <div class="bg-orb bg-orb--2"></div>
        <div class="bg-orb bg-orb--3"></div>
      </div>

      <!-- CTA hero card -->
      <div class="cta-card">
        <div class="cta-card__grain" aria-hidden="true"></div>
        <div class="cta-card__shimmer" aria-hidden="true"></div>

        <div class="cta-content">
          <div class="cta-badge">
            <span class="cta-badge__dot"></span>
            <span>Siap Digunakan</span>
          </div>
          <h2 class="cta-title">
            Analisis Kualitas Air<br />
            <span class="cta-title--accent">Berbasis Kecerdasan Buatan</span>
          </h2>
          <p class="cta-desc">
            Upload foto sampel air dan isi data pendukung untuk mendapatkan
            hasil analisis AI yang akurat dan rekomendasi kesehatan secara instan.
          </p>
          <div class="cta-actions">
            <RouterLink to="/analysis" id="btn-start-analysis" class="cta-btn btn btn--primary">
              <FlaskConicalIcon class="cta-btn-icon" size="17" />
              Mulai Analisis
            </RouterLink>
            <RouterLink to="/history" class="cta-btn-secondary">
              Lihat Riwayat
              <ArrowRightIcon size="14" />
            </RouterLink>
          </div>

          <div class="cta-trust">
            <div class="cta-trust__item">
              <CheckCircleIcon size="13" class="cta-trust__icon" />
              <span>Akurasi AI &gt;95%</span>
            </div>
            <div class="cta-trust__divider" aria-hidden="true"></div>
            <div class="cta-trust__item">
              <ZapIcon size="13" class="cta-trust__icon" />
              <span>Hasil dalam hitungan detik</span>
            </div>
            <div class="cta-trust__divider" aria-hidden="true"></div>
            <div class="cta-trust__item">
              <ShieldCheckIcon size="13" class="cta-trust__icon" />
              <span>Sistem Cerdas</span>
            </div>
          </div>
        </div>

        <div class="cta-visual" aria-hidden="true">
          <div class="water-orb">
            <DropletIcon size="44" color="#ffffff" />
            <div class="water-orb__inner"></div>
          </div>
          <div class="orb-ring ring-1"></div>
          <div class="orb-ring ring-2"></div>
          <div class="orb-ring ring-3"></div>
          <div class="orb-particles">
            <span class="particle" v-for="n in 8" :key="n"></span>
          </div>
        </div>
      </div>

      <!-- Stats grid -->
      <div class="stats-grid">
        <div
          class="stat-card"
          v-for="stat in statsArray"
          :key="stat.label"
          :style="{ '--stat-color': stat.color, '--stat-bg': stat.bg }"
        >
          <div class="stat-card__top">
            <div class="stat-icon-wrap">
              <component :is="stat.icon" class="stat-icon" size="18" />
            </div>
            <span class="stat-trend" v-if="stat.trend">
              <TrendingUpIcon size="11" />
              {{ stat.trend }}
            </span>
          </div>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-card__bar">
            <div class="stat-card__bar-fill" :style="{ width: stat.barWidth || '60%' }"></div>
          </div>
        </div>
      </div>

      <!-- Main content grid: recent + quick insights -->
      <div class="content-grid mt-8">

        <!-- Recent Analyses -->
        <div class="recent-section">
          <div class="section-header">
            <div class="section-header__left">
              <h2 class="section-title">Aktivitas Terakhir</h2>
              <p class="section-sub">Riwayat analisis sampel air terbaru.</p>
            </div>
            <RouterLink to="/history" class="section-link">
              Lihat Semua <ArrowRightIcon size="13" />
            </RouterLink>
          </div>

          <div class="recent-card card p-0">
            <div v-if="loading" class="loading-state">
              <div class="loading-pulse" v-for="n in 3" :key="n"></div>
            </div>
            <div v-else-if="recentAnalyses.length === 0" class="empty-state">
              <div class="empty-icon-wrap">
                <ClipboardCheckIcon size="28" class="empty-icon-svg" />
              </div>
              <h3 class="empty-title">Belum Ada Analisis</h3>
              <p class="empty-desc">
                Mulai analisis pertama Anda untuk melihat riwayat di sini.
              </p>
              <RouterLink to="/analysis" class="btn btn--primary mt-4">Mulai Analisis</RouterLink>
            </div>
            <div v-else class="recent-list">
              <div
                v-for="(item, index) in recentAnalyses"
                :key="item.id"
                class="recent-item"
                :style="{ '--item-index': index }"
              >
                <div class="recent-item__index">{{ String(index + 1).padStart(2, '0') }}</div>
                <div class="recent-item-info">
                  <span class="recent-title">Sampel #{{ String(item.id).substring(0, 6).toUpperCase() }}</span>
                  <span class="recent-date">
                    <CalendarIcon size="11" />
                    {{ formatDate(item.created_at) }}
                  </span>
                </div>
                <div class="recent-item-status">
                  <span class="badge" :class="item.category">{{ formatCategory(item.category) }}</span>
                  <div class="confidence-wrap">
                    <div class="confidence-bar">
                      <div
                        class="confidence-bar__fill"
                        :class="item.category"
                        :style="{ width: Math.round(item.confidence * 100) + '%' }"
                      ></div>
                    </div>
                    <span class="recent-conf">{{ Math.round(item.confidence * 100) }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Insights panel -->
        <div class="insights-section">
          <div class="section-header">
            <div class="section-header__left">
              <h2 class="section-title">Parameter Penting</h2>
              <p class="section-sub">Aspek utama dalam analisis air.</p>
            </div>
          </div>

          <div class="insights-stack">
            <div class="insight-card" v-for="param in waterParams" :key="param.name">
              <div class="insight-card__icon" :style="{ background: param.bg, color: param.color }">
                <component :is="param.icon" size="15" />
              </div>
              <div class="insight-card__body">
                <span class="insight-name">{{ param.name }}</span>
                <span class="insight-desc">{{ param.desc }}</span>
              </div>
              <div class="insight-card__status" :class="param.status">
                <span class="insight-dot"></span>
                {{ param.statusLabel }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- How it works -->
      <div class="section-header mt-10">
        <div class="section-header__left">
          <h2 class="section-title">Cara Penggunaan</h2>
          <p class="section-sub">Tiga langkah mudah untuk menganalisis kualitas air Anda.</p>
        </div>
      </div>

      <div class="steps-grid">
        <div class="step-card" v-for="(step, i) in steps" :key="i" :style="{ '--step-delay': i * 80 + 'ms' }">
          <div class="step-card__connector" v-if="i < steps.length - 1" aria-hidden="true">
            <ArrowRightIcon size="16" />
          </div>
          <div class="step-header">
            <div class="step-number">
              <span>{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <div class="step-icon-wrap">
              <component :is="step.icon" class="step-icon" size="20" />
            </div>
          </div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-desc">{{ step.desc }}</p>
          <div class="step-chip">{{ step.chip }}</div>
        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import {
  FlaskConicalIcon,
  DropletIcon,
  ClipboardCheckIcon,
  UploadIcon,
  BeakerIcon,
  CheckCircleIcon,
  ActivityIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  ZapIcon,
  CalendarIcon,
  ThermometerIcon,
  EyeIcon,
  WindIcon,
  ApertureIcon
} from 'lucide-vue-next'

const loading = ref(true)
const recentAnalyses = ref([])

const statsData = ref({
  total: '—',
  accuracy: '—',
  monthly: '—',
  lastStatus: '—'
})

const statsArray = computed(() => [
  {
    label: 'Total Analisis',
    value: statsData.value.total,
    icon: FlaskConicalIcon,
    bg: '#eff6ff',
    color: '#3b82f6',
    trend: '+12%',
    barWidth: '72%'
  },
  {
    label: 'Akurasi Rata-rata',
    value: statsData.value.accuracy,
    icon: ActivityIcon,
    bg: '#f0fdf4',
    color: '#10b981',
    trend: '+3%',
    barWidth: '88%'
  },
  {
    label: 'Analisis Bulan Ini',
    value: statsData.value.monthly,
    icon: ClipboardCheckIcon,
    bg: '#fffbeb',
    color: '#f59e0b',
    trend: null,
    barWidth: '45%'
  }
])

const waterParams = [
  {
    name: 'Kekeruhan',
    desc: 'Kejernihan visual air',
    icon: EyeIcon,
    bg: '#eff6ff',
    color: '#3b82f6',
    status: 'good',
    statusLabel: 'Terdeteksi'
  },
  {
    name: 'Warna & Odor',
    desc: 'Indikator kontaminasi awal',
    icon: WindIcon,
    bg: '#f0fdf4',
    color: '#10b981',
    status: 'good',
    statusLabel: 'Terdeteksi'
  },
  {
    name: 'Suhu Sampel',
    desc: 'Pengaruhi pertumbuhan bakteri',
    icon: ThermometerIcon,
    bg: '#fffbeb',
    color: '#f59e0b',
    status: 'neutral',
    statusLabel: 'Opsional'
  },
  {
    name: 'Sumber Air',
    desc: 'Konteks asal pengambilan',
    icon: ApertureIcon,
    bg: '#fdf2f8',
    color: '#a855f7',
    status: 'neutral',
    statusLabel: 'Opsional'
  }
]

async function fetchDashboardData() {
  loading.value = true
  try {
    const res = await axios.get('/api/analysis/history', {
      params: { page: 1, per_page: 5 }
    })
    const items = res.data.items || []
    recentAnalyses.value = items
    statsData.value.total = res.data.total || items.length

    if (items.length > 0) {
      const avgConf = items.reduce((acc, curr) => acc + curr.confidence, 0) / items.length
      statsData.value.accuracy = Math.round(avgConf * 100) + '%'
      const currentMonth = new Date().getMonth()
      statsData.value.monthly = items.filter(
        i => new Date(i.created_at).getMonth() === currentMonth
      ).length
      statsData.value.lastStatus = items[0].category
    } else {
      statsData.value.total = '0'
      statsData.value.accuracy = '0%'
      statsData.value.monthly = '0'
      statsData.value.lastStatus = 'Belum Ada'
    }
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
})

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

function formatCategory(category) {
  if (!category || category === '—' || category === 'Belum Ada') return category
  const map = {
    layak: 'Aman',
    tidak_layak: 'Perlu Perlakuan',
    tercemar: 'Tercemar'
  }
  return map[category] || category.replace('_', ' ')
}

const steps = [
  {
    title: 'Upload Foto Air',
    desc: 'Ambil atau pilih foto sampel air dari galeri perangkat Anda.',
    icon: UploadIcon,
    chip: 'Langkah 1'
  },
  {
    title: 'Isi Data Pendukung',
    desc: 'Lengkapi informasi warna, bau, dan sumber air untuk meningkatkan akurasi.',
    icon: BeakerIcon,
    chip: 'Langkah 2'
  },
  {
    title: 'Hasil & Rekomendasi',
    desc: 'AI menganalisis dan memberikan laporan kualitas serta rekomendasi kesehatan.',
    icon: CheckCircleIcon,
    chip: 'Langkah 3'
  }
]
</script>

<style scoped>
/* ─── Spacing utilities ──────────────────────────────── */
.mt-8  { margin-top: 32px; }
.mt-10 { margin-top: 40px; }
.mt-4  { margin-top: 16px; }
.p-0   { padding: 0 !important; }

/* ─── Ambient background orbs ───────────────────────── */
.bg-orbs {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.045;
}
.bg-orb--1 {
  width: 520px; height: 520px;
  background: #3b82f6;
  top: -120px; right: -80px;
  animation: orbDrift 18s ease-in-out infinite alternate;
}
.bg-orb--2 {
  width: 400px; height: 400px;
  background: #10b981;
  bottom: 160px; left: -100px;
  animation: orbDrift 24s ease-in-out infinite alternate-reverse;
}
.bg-orb--3 {
  width: 300px; height: 300px;
  background: #8b5cf6;
  top: 40%; right: 20%;
  animation: orbDrift 30s ease-in-out infinite alternate;
}
@keyframes orbDrift {
  from { transform: translate(0, 0); }
  to   { transform: translate(30px, 20px); }
}

/* ─── Dashboard page wrapper ─────────────────────────── */
.dashboard-page {
  position: relative;
  z-index: 1;
}

/* ─── CTA card ───────────────────────────────────────── */
.cta-card {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 44px 52px;
  border-radius: var(--radius-xl, 20px);
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f2942 100%);
  box-shadow:
    0 4px 6px -1px rgba(0,0,0,.15),
    0 20px 60px -10px rgba(59,130,246,.18),
    inset 0 1px 0 rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.07);
}

/* grain texture overlay */
.cta-card__grain {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 180px;
}

/* shimmer streak */
.cta-card__shimmer {
  position: absolute;
  top: -60%;
  left: -20%;
  width: 60%;
  height: 200%;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.03) 50%, transparent 60%);
  animation: shimmerSlide 8s ease-in-out infinite;
  pointer-events: none;
}
@keyframes shimmerSlide {
  0%   { transform: translateX(-60%) skewX(-15deg); }
  50%  { transform: translateX(200%) skewX(-15deg); }
  100% { transform: translateX(-60%) skewX(-15deg); }
}

/* Badge */
.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(59,130,246,.15);
  border: 1px solid rgba(59,130,246,.25);
  color: #93c5fd;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 100px;
  margin-bottom: 18px;
  width: fit-content;
}
.cta-badge__dot {
  width: 6px; height: 6px;
  background: #3b82f6;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(59,130,246,.25);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 3px rgba(59,130,246,.25); }
  50%       { transform: scale(1.1); box-shadow: 0 0 0 5px rgba(59,130,246,.15); }
}

/* Title */
.cta-title {
  font-size: clamp(22px, 2.4vw, 28px);
  font-weight: 700;
  color: #f0f9ff;
  line-height: 1.25;
  margin: 0 0 14px;
  letter-spacing: -0.4px;
}
.cta-title--accent {
  background: linear-gradient(90deg, #60a5fa, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-desc {
  font-size: 14px;
  color: rgba(255,255,255,.55);
  line-height: 1.65;
  margin: 0 0 28px;
  max-width: 440px;
}

/* Actions */
.cta-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  padding: 11px 22px;
  border-radius: 10px;
  text-decoration: none;
}
.cta-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 500;
  color: rgba(255,255,255,.55);
  text-decoration: none;
  transition: color var(--transition-fast);
}
.cta-btn-secondary:hover { color: rgba(255,255,255,.85); }

/* Trust row */
.cta-trust {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 24px;
  flex-wrap: wrap;
}
.cta-trust__item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255,255,255,.38);
  font-weight: 500;
}
.cta-trust__icon { color: rgba(255,255,255,.3); }
.cta-trust__divider {
  width: 1px; height: 14px;
  background: rgba(255,255,255,.12);
}

/* Visual side */
.cta-visual {
  position: relative;
  flex-shrink: 0;
  width: 180px;
  height: 180px;
}
.water-orb {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 76px; height: 76px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1d4ed8, #0891b2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 0 10px rgba(59,130,246,.12),
    0 12px 40px rgba(59,130,246,.3);
  z-index: 3;
  animation: orbBob 4s ease-in-out infinite;
}
@keyframes orbBob {
  0%, 100% { transform: translate(-50%, -50%) translateY(0); }
  50%       { transform: translate(-50%, -50%) translateY(-6px); }
}
.water-orb__inner {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,.08);
  animation: orbInnerPulse 3s ease-in-out infinite;
}
@keyframes orbInnerPulse {
  0%, 100% { opacity: .08; }
  50%       { opacity: .18; }
}

.orb-ring {
  position: absolute;
  top: 50%; left: 50%;
  border-radius: 50%;
  border: 1px solid rgba(59,130,246,.2);
  transform: translate(-50%, -50%);
}
.ring-1 { width: 100px; height: 100px; animation: ringPulse 3s ease-in-out infinite 0.0s; }
.ring-2 { width: 136px; height: 136px; animation: ringPulse 3s ease-in-out infinite 0.5s; border-color: rgba(59,130,246,.12); }
.ring-3 { width: 172px; height: 172px; animation: ringPulse 3s ease-in-out infinite 1.0s; border-color: rgba(59,130,246,.06); }
@keyframes ringPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50%       { transform: translate(-50%, -50%) scale(1.04); opacity: .6; }
}

/* Particles */
.orb-particles { position: absolute; inset: 0; }
.particle {
  position: absolute;
  top: 50%; left: 50%;
  width: 4px; height: 4px;
  background: rgba(96,165,250,.7);
  border-radius: 50%;
}
.particle:nth-child(1)  { animation: particleFloat 5s infinite 0.0s; }
.particle:nth-child(2)  { animation: particleFloat 6s infinite 0.7s; }
.particle:nth-child(3)  { animation: particleFloat 4s infinite 1.4s; }
.particle:nth-child(4)  { animation: particleFloat 7s infinite 2.1s; }
.particle:nth-child(5)  { animation: particleFloat 5s infinite 2.8s; }
.particle:nth-child(6)  { animation: particleFloat 6s infinite 0.4s; }
.particle:nth-child(7)  { animation: particleFloat 4s infinite 1.0s; }
.particle:nth-child(8)  { animation: particleFloat 8s infinite 1.7s; }
@keyframes particleFloat {
  0%   { transform: translate(-50%, -50%) rotate(0deg) translateX(60px) scale(1); opacity: .7; }
  50%  { opacity: .3; }
  100% { transform: translate(-50%, -50%) rotate(360deg) translateX(60px) scale(0); opacity: 0; }
}
.particle:nth-child(even) { animation-direction: reverse; background: rgba(52,211,153,.7); }

/* ─── Stats grid ─────────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 24px;
}

.stat-card {
  position: relative;
  overflow: hidden;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg, 14px);
  padding: 20px 22px;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  cursor: default;
}
.stat-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--stat-color);
  opacity: 0;
  transition: opacity 0.2s;
}
.stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.07); }
.stat-card:hover::before { opacity: 1; }

.stat-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.stat-icon-wrap {
  width: 36px; height: 36px;
  border-radius: 9px;
  background: var(--stat-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-icon { color: var(--stat-color); }

.stat-trend {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 600;
  color: #10b981;
  background: #f0fdf4;
  padding: 3px 7px;
  border-radius: 100px;
}

.stat-value {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.5px;
  line-height: 1;
  margin-bottom: 6px;
}
.stat-label {
  font-size: 12.5px;
  color: var(--color-text-muted);
  font-weight: 500;
  margin-bottom: 14px;
}

.stat-card__bar {
  height: 3px;
  background: var(--color-border-light);
  border-radius: 100px;
  overflow: hidden;
}
.stat-card__bar-fill {
  height: 100%;
  background: var(--stat-color);
  border-radius: 100px;
  opacity: 0.7;
  transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ─── Main content grid ──────────────────────────────── */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  align-items: start;
}

/* ─── Section headers ────────────────────────────────── */
.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 14px;
}
.section-header__left { display: flex; flex-direction: column; gap: 2px; }
.section-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}
.section-sub {
  font-size: 12.5px;
  color: var(--color-text-muted);
  margin: 0;
}
.section-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-primary, #3b82f6);
  text-decoration: none;
  transition: gap 0.15s;
}
.section-link:hover { gap: 8px; }

/* ─── Recent card & list ─────────────────────────────── */
.recent-card {
  border-radius: var(--radius-lg, 14px);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  background: var(--color-surface, #fff);
}

.loading-state {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.loading-pulse {
  height: 54px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--color-border-light) 25%, rgba(0,0,0,.03) 50%, var(--color-border-light) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.recent-list { display: flex; flex-direction: column; }
.recent-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border-light);
  transition: background 0.12s ease;
  animation: fadeSlideIn 0.3s ease both;
  animation-delay: calc(var(--item-index, 0) * 60ms);
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.recent-item:last-child { border-bottom: none; }
.recent-item:hover { background: var(--color-bg, #fafafa); }

.recent-item__index {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  min-width: 20px;
  opacity: 0.5;
}
.recent-item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
.recent-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-text-primary);
  font-family: 'SF Mono', 'Fira Code', monospace;
  letter-spacing: 0.02em;
}
.recent-date {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  color: var(--color-text-muted);
}

.recent-item-status {
  display: flex;
  align-items: center;
  gap: 14px;
}
.confidence-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.confidence-bar {
  width: 56px;
  height: 4px;
  background: var(--color-border-light);
  border-radius: 100px;
  overflow: hidden;
}
.confidence-bar__fill {
  height: 100%;
  border-radius: 100px;
  transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.confidence-bar__fill.layak       { background: var(--color-success-text); }
.confidence-bar__fill.tidak_layak { background: var(--color-warning-text); }
.confidence-bar__fill.tercemar    { background: var(--color-danger-text); }

.recent-conf {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--color-text-secondary);
  min-width: 36px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

/* Badges */
.badge {
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}
.badge.layak        { background: var(--color-success-bg); color: var(--color-success-text); }
.badge.tidak_layak  { background: var(--color-warning-bg); color: var(--color-warning-text); }
.badge.tercemar     { background: var(--color-danger-bg);  color: var(--color-danger-text); }

/* Empty state */
.empty-state {
  padding: 52px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.empty-icon-wrap {
  width: 56px; height: 56px;
  border-radius: 16px;
  background: var(--color-border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}
.empty-icon-svg { color: var(--color-text-muted); }
.empty-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 8px;
}
.empty-desc {
  font-size: 13px;
  color: var(--color-text-muted);
  max-width: 320px;
  line-height: 1.55;
}

/* ─── Insights side panel ────────────────────────────── */
.insights-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.insight-card {
  display: flex;
  align-items: center;
  gap: 13px;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg, 14px);
  padding: 14px 16px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.insight-card:hover {
  transform: translateX(3px);
  box-shadow: 0 4px 14px rgba(0,0,0,.06);
}
.insight-card__icon {
  width: 34px; height: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.insight-card__body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}
.insight-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
}
.insight-desc {
  font-size: 11.5px;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.insight-card__status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 4px 9px;
  border-radius: 100px;
  white-space: nowrap;
}
.insight-card__status.good {
  background: #f0fdf4;
  color: #15803d;
}
.insight-card__status.neutral {
  background: var(--color-border-light);
  color: var(--color-text-muted);
}
.insight-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.7;
}

/* ─── Steps grid ─────────────────────────────────────── */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  position: relative;
}

.step-card {
  position: relative;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg, 14px);
  padding: 28px 24px 24px;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  animation: fadeSlideIn 0.4s ease both;
  animation-delay: var(--step-delay, 0ms);
}
.step-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,.08);
}

/* connector arrow between steps */
.step-card__connector {
  position: absolute;
  top: 50%;
  right: -16px;
  transform: translate(50%, -50%);
  z-index: 2;
  width: 28px; height: 28px;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.step-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
}
.step-number {
  font-size: 11px;
  font-weight: 800;
  color: var(--color-text-muted);
  letter-spacing: 0.1em;
  opacity: 0.4;
  font-variant-numeric: tabular-nums;
}
.step-icon-wrap {
  width: 42px; height: 42px;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(59,130,246,.12);
}
.step-icon { color: #3b82f6; }

.step-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 10px;
  line-height: 1.3;
}
.step-desc {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0 0 18px;
}
.step-chip {
  display: inline-flex;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border-light);
  padding: 4px 10px;
  border-radius: 100px;
  opacity: 0.6;
}

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .content-grid  { grid-template-columns: 1fr; }
  .cta-visual    { display: none; }
  .cta-card      { padding: 36px 32px; }
}
@media (max-width: 768px) {
  .stats-grid    { grid-template-columns: 1fr; }
  .steps-grid    { grid-template-columns: 1fr; }
  .cta-card      { padding: 28px 24px; }
  .step-card__connector { display: none; }
}
</style>