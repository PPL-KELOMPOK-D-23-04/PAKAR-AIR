<template>
  <DashboardLayout>
    <div class="history-detail-view">
      
      <!-- Premium Workspace Header -->
      <header class="workspace-header">
        <div class="header-left">
          <router-link to="/history" class="back-link">
            <div class="back-icon-wrap">
              <ChevronLeft size="16" />
            </div>
            Kembali ke Riwayat
          </router-link>
          
          <div class="title-group">
            <h1 class="workspace-title">Detail Analisis</h1>
            <span class="id-badge">ID: {{ displayId }}</span>
          </div>
          <p class="workspace-desc">Rincian parameter dan hasil prediksi berdasarkan model untuk sampel air ini.</p>
        </div>
      </header>

      <div class="workspace-content">
        <!-- Loading State -->
        <div v-if="loading" class="state-container">
          <div class="spinner"></div>
          <p class="state-text">Memuat detail analisis...</p>
        </div>

        <!-- Error State -->
        <EmptyState
          v-else-if="error"
          :icon="AlertCircle"
          title="Data Tidak Ditemukan"
          :description="error"
          actionLabel="Kembali ke Riwayat"
          actionTo="/history"
        />

        <!-- Result Content -->
        <div v-else-if="result" class="detail-wrapper">
          <PredictionResult :result="result" />
        </div>
      </div>
      
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import PredictionResult from '@/components/analysis/PredictionResult.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { ChevronLeft, AlertCircle } from 'lucide-vue-next'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const result = ref(null)
const loading = ref(true)
const error = ref(null)

const displayId = computed(() => {
  const id = route.params.id
  // Tampilkan ID secara rapi, misal ambil 8 karakter pertama jika UUID
  if (id && id.length > 8 && id.includes('-')) {
    return id.split('-')[0].toUpperCase()
  }
  return id
})

onMounted(async () => {
  try {
    const res = await axios.get(`/api/analysis/${route.params.id}`)
    if (res.data && res.data.result) {
      result.value = res.data.result
    } else {
      result.value = res.data
    }
  } catch (err) {
    console.error(err)
    error.value = 'Data analisis untuk ID ini tidak dapat ditemukan atau terjadi kesalahan server.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.history-detail-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* Header Area */
.workspace-header {
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--color-border-light);
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  width: fit-content;
}

.back-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.back-link:hover {
  color: var(--color-text-primary);
}

.back-link:hover .back-icon-wrap {
  border-color: var(--color-text-muted);
  transform: translateX(-2px);
}

.title-group {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.workspace-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
  letter-spacing: -0.02em;
}

.id-badge {
  background: var(--color-neutral-bg);
  color: var(--color-text-secondary);
  font-family: var(--font-mono, monospace);
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 4px 10px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.workspace-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

/* Content Area */
.workspace-content {
  flex: 1;
}

.detail-wrapper {
  max-width: 800px;
  margin: 0 auto;
  /* Tambahkan efek pop up subtle untuk kartu */
  animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

/* States */
.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;
}

.state-text {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  margin: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
