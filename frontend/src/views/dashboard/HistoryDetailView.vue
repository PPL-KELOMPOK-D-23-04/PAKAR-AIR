<template>
  <DashboardLayout>
    <div class="detail-view">

      <!-- Back Button -->
      <button class="btn-back" @click="router.push('/history')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Kembali ke Riwayat
      </button>

      <!-- Loading -->
      <div v-if="loading" class="state-box">
        <div class="spinner"></div>
        <p class="state-text">Memuat detail analisis...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="state-box state-box--error">
        <div class="state-icon">⚠️</div>
        <p class="state-text">{{ error }}</p>
        <button @click="fetchDetail" class="btn btn--secondary">Coba Lagi</button>
      </div>

      <!-- Content -->
      <div v-else-if="detail" class="detail-content">

        <!-- Header -->
        <div class="detail-header">
          <div>
            <h1 class="detail-title">Detail Analisis</h1>
            <p class="detail-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(detail.created_at) }}
            </p>
          </div>
          <span class="status-badge" :class="'status--' + detail.result?.category">
            {{ detail.result?.category === 'layak' ? '✅ Layak' : '❌ Tidak Layak' }}
          </span>
        </div>

        <div class="detail-grid">

          <!-- Image -->
          <div class="card">
            <h2 class="card-title">Foto Sampel Air</h2>
            <div class="image-wrap">
              <img v-if="detail.image_input?.image_path" :src="detail.image_input.image_path" alt="Sampel Air" class="detail-image" />
              <div v-else class="no-image">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Tidak ada foto</p>
              </div>
            </div>
          </div>

          <!-- Result -->
          <div class="card">
            <h2 class="card-title">Hasil Analisis</h2>
            <div class="result-wrap">
              <div class="result-category" :class="'result--' + detail.result?.category">
                {{ detail.result?.category === 'layak' ? '✅ Layak Digunakan' : '❌ Tidak Layak Digunakan' }}
              </div>
              <div class="confidence-bar-wrap" v-if="detail.result?.confidence">
                <div class="confidence-label">
                  <span>Tingkat Kepercayaan</span>
                  <span class="confidence-value">{{ Math.round(detail.result.confidence * 100) }}%</span>
                </div>
                <div class="confidence-bar">
                  <div class="confidence-fill" :style="{ width: (detail.result.confidence * 100) + '%' }" :class="'fill--' + detail.result?.category"></div>
                </div>
              </div>
              <div v-if="detail.result?.explanation" class="explanation">
                <h3 class="section-label">Penjelasan</h3>
                <p>{{ detail.result.explanation }}</p>
              </div>
              <div v-if="detail.result?.recommendation" class="recommendation">
                <h3 class="section-label">Rekomendasi</h3>
                <p>{{ detail.result.recommendation }}</p>
              </div>
            </div>
          </div>

          <!-- Manual Input -->
          <div class="card card--full" v-if="detail.manual_input">
            <h2 class="card-title">Parameter Kimia Air</h2>
            <div class="params-grid">
              <div class="param-item" v-for="(value, key) in detail.manual_input" :key="key">
                <span class="param-label">{{ key }}</span>
                <span class="param-value">{{ value ?? '-' }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const router = useRouter()
const route = useRoute()
const detail = ref(null)
const loading = ref(true)
const error = ref(null)

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

async function fetchDetail() {
  loading.value = true
  error.value = null
  try {
    const token = localStorage.getItem('pakar_air_token') || localStorage.getItem('token')
    const res = await axios.get(`${API_BASE}/api/analysis/${route.params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    detail.value = res.data
  } catch (err) {
    error.value = 'Gagal memuat detail analisis. Silakan coba lagi.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

onMounted(fetchDetail)
</script>

<style scoped>
.detail-view { display: flex; flex-direction: column; gap: 20px; }

.btn-back {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 600; color: #64748b;
  background: none; border: none; cursor: pointer; padding: 0;
  transition: color 0.2s;
}
.btn-back:hover { color: #1a202c; }

.state-box {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 60px 20px; text-align: center;
  background: #fff; border-radius: 16px; border: 1.5px dashed #cbd5e1;
}
.state-box--error { border-color: #fca5a5; background: #fff5f5; }
.state-icon { font-size: 48px; margin-bottom: 16px; }
.state-text { font-size: 14px; color: #64748b; margin-bottom: 20px; }

.spinner {
  width: 32px; height: 32px;
  border: 3px solid #f3f3f3; border-top: 3px solid #3b82f6;
  border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 12px;
}
@keyframes spin { to { transform: rotate(360deg); } }

.btn { padding: 8px 18px; font-size: 14px; font-weight: 600; border-radius: 8px; cursor: pointer; border: 1px solid transparent; }
.btn--secondary { background: #fff; border-color: #e2e8f0; color: #64748b; }

.detail-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
}
.detail-title { font-size: 22px; font-weight: 700; color: #1a202c; margin-bottom: 6px; }
.detail-date { display: flex; align-items: center; gap: 5px; font-size: 13px; color: #94a3b8; }

.status-badge { font-size: 13px; font-weight: 700; padding: 6px 16px; border-radius: 20px; }
.status--layak { background: #dcfce7; color: #16a34a; }
.status--tidak_layak { background: #fee2e2; color: #dc2626; }

.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

.card {
  background: #fff; border: 1.5px solid #e2e8f0;
  border-radius: 16px; padding: 24px;
}
.card--full { grid-column: 1 / -1; }
.card-title { font-size: 15px; font-weight: 700; color: #1a202c; margin-bottom: 16px; }

.image-wrap { border-radius: 12px; overflow: hidden; background: #f1f5f9; }
.detail-image { width: 100%; height: 240px; object-fit: cover; display: block; }
.no-image {
  height: 240px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 10px;
  color: #cbd5e1; font-size: 13px;
}

.result-category {
  font-size: 18px; font-weight: 700; text-align: center;
  padding: 16px; border-radius: 12px; margin-bottom: 16px;
}
.result--layak { background: #dcfce7; color: #16a34a; }
.result--tidak_layak { background: #fee2e2; color: #dc2626; }

.confidence-bar-wrap { margin-bottom: 16px; }
.confidence-label { display: flex; justify-content: space-between; font-size: 13px; color: #64748b; margin-bottom: 6px; }
.confidence-value { font-weight: 700; color: #1a202c; }
.confidence-bar { height: 8px; background: #f1f5f9; border-radius: 100px; overflow: hidden; }
.confidence-fill { height: 100%; border-radius: 100px; transition: width 0.5s ease; }
.fill--layak { background: #22c55e; }
.fill--tidak_layak { background: #ef4444; }

.section-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 6px; }
.explanation, .recommendation { margin-bottom: 14px; font-size: 13px; color: #4a5568; line-height: 1.65; }

.params-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
.param-item {
  background: #f8fafc; border-radius: 10px; padding: 12px;
  display: flex; flex-direction: column; gap: 4px;
}
.param-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
.param-value { font-size: 15px; font-weight: 600; color: #1a202c; }
</style>
