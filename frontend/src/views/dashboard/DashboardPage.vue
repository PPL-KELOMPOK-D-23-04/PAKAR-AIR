<template>
  <DashboardLayout>
    <div class="dashboard-page">
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
      </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import {
  FlaskConicalIcon,
  DropletIcon,
  ClipboardCheckIcon,
  UploadIcon,
  BeakerIcon,
  CheckCircleIcon,
} from 'lucide-vue-next'

const stats = ref([
  { label: 'Total Analisis', value: '0', icon: FlaskConicalIcon, bg: 'rgba(59,130,246,0.1)', color: '#3b82f6' },
  { label: 'Air Aman', value: '0', icon: DropletIcon, bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
  { label: 'Perlu Perhatian', value: '0', icon: ClipboardCheckIcon, bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
])

async function fetchStats() {
  try {
    const res = await axios.get('/api/analysis/history', {
      params: { page: 1, per_page: 999 }
    })
    const items = res.data.items || []
    const total = res.data.total || items.length
    const aman = items.filter(i => i.category === 'layak').length
    const perhatian = items.filter(i => i.category === 'tidak_layak').length

    stats.value[0].value = String(total)
    stats.value[1].value = String(aman)
    stats.value[2].value = String(perhatian)
  } catch {
    // Biarkan tetap 0 kalau gagal
  }
}

onMounted(fetchStats)

const steps = [
  { title: 'Upload Foto Air', desc: 'Ambil foto sampel air langsung dari kamera atau galeri.', icon: UploadIcon },
  { title: 'Isi Data Pendukung', desc: 'Lengkapi info warna, bau, dan sumber air untuk akurasi lebih tinggi.', icon: BeakerIcon },
  { title: 'Dapatkan Hasil Instan', desc: 'AI menganalisis dan memberikan rekomendasi kesehatan.', icon: CheckCircleIcon },
]
</script>

<style scoped src="@/assets/styles/pages/dashboard.css"></style>
