<template>
  <DashboardLayout>
    <div class="dashboard-view">

      <!-- HEADER -->
      <div class="page-header">
        <h1 class="page-header__title">Dashboard</h1>
        <p class="page-header__desc">
          Selamat datang! Lihat ringkasan analisis air Anda
        </p>
      </div>

      <!-- STATS -->
      <div class="stats-grid">
        <div class="stat-card" v-for="stat in stats" :key="stat.label">
          <div class="stat-left">
            <div class="stat-icon" :style="{ background: stat.bg }">
              <component :is="stat.icon" />
            </div>

            <div>
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-card">
        <div class="cta-content">
          <span class="cta-badge">Siap Digunakan</span>
          <h2 class="cta-title">Mulai Analisis Kualitas Air</h2>
          <p class="cta-desc">
            Upload foto air dan dapatkan hasil analisis dalam hitungan detik
          </p>

          <RouterLink to="/analysis" class="cta-btn">
            <FlaskConicalIcon width="16" />
            Mulai Analisis
          </RouterLink>
        </div>
      </div>

      <!-- STEPS -->
      <div class="section-header">
        <h2>Cara Penggunaan</h2>
        <p>Tiga langkah mudah untuk menganalisis air</p>
      </div>

      <div class="steps-grid">
        <div class="step-card" v-for="(step, i) in steps" :key="i">
          <div class="step-number">{{ i + 1 }}</div>

          <div class="step-icon">
            <component :is="step.icon" />
          </div>

          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import DashboardLayout from '../../layouts/DashboardLayout.vue'

import {
  FlaskConicalIcon,
  DropletIcon,
  ClipboardCheckIcon,
  UploadIcon,
  BeakerIcon,
  CheckCircleIcon
} from 'lucide-vue-next'
<<<<<<< HEAD
=======
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const sidebarCollapsed = ref(false)
const showLogoutModal = ref(false)

const userDisplayName = computed(() => {
  try {
    const stored = JSON.parse(sessionStorage.getItem('pakar_air_user') || '{}')
    return stored?.full_name || stored?.email?.split('@')[0] || authStore.currentUser?.full_name || 'Pengguna'
  } catch {
    return authStore.currentUser?.full_name || 'Pengguna'
  }
})
const userInitial = computed(() => userDisplayName.value.charAt(0).toUpperCase())
>>>>>>> origin/main

const stats = ref([
  {
    label: 'Total Analisis',
    value: '0',
    icon: FlaskConicalIcon,
    bg: 'rgba(59,130,246,0.1)',
    color: '#3b82f6'
  },
  {
    label: 'Air Aman',
    value: '0',
    icon: DropletIcon,
    bg: 'rgba(16,185,129,0.1)',
    color: '#10b981'
  },
  {
    label: 'Perlu Perhatian',
    value: '0',
    icon: ClipboardCheckIcon,
    bg: 'rgba(245,158,11,0.1)',
    color: '#f59e0b'
  },
])

async function fetchStats() {
  try {
    const res = await axios.get('/api/analysis/history', {
      params: {
        page: 1,
        per_page: 999
      }
    })

    const items = res.data.items || []
    const total = res.data.total || items.length

    const aman = items.filter(
      i => i.category === 'layak'
    ).length

    const perhatian = items.filter(
      i => i.category === 'tidak_layak'
    ).length

    stats.value[0].value = String(total)
    stats.value[1].value = String(aman)
    stats.value[2].value = String(perhatian)

  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchStats)

const steps = [
  { title: 'Upload Foto Air', desc: 'Ambil foto air.', icon: UploadIcon },
  { title: 'Isi Data', desc: 'Lengkapi data.', icon: BeakerIcon },
  { title: 'Hasil Instan', desc: 'AI menganalisis.', icon: CheckCircleIcon }
]
</script>

<style scoped>

/* ROOT */
.dashboard-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* HEADER */
.page-header__title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
}

.page-header__desc {
  font-size: 13px;
  color: #6b7280;
}

/* STATS */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
}

.stat-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
}

/* CTA */
.cta-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
}

.cta-content {
  max-width: 600px;
}

.cta-badge {
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
}

.cta-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-top: 4px;
}

.cta-desc {
  font-size: 13px;
  color: #6b7280;
  margin: 6px 0 12px;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #1f2937;
  color: #ffffff;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 500;
  text-decoration: none;
}

.cta-btn:hover {
  background: #111827;
}

/* SECTION */
.section-header h2 {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.section-header p {
  font-size: 12px;
  color: #6b7280;
}

/* STEPS */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.step-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  border: 1px solid #e5e7eb;
}

.step-number {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.step-icon {
  margin: 10px auto;
  width: 34px;
  height: 34px;
  background: #f3f4f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-card h3 {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
}

.step-card p {
  font-size: 12px;
  color: #6b7280;
}

</style>