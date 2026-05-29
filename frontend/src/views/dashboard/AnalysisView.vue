<template>
  <DashboardLayout>
    <div class="analysis-view">

      <!-- Workspace Header -->
      <header class="workspace-header">
        <div class="workspace-header__main">
          <h1 class="workspace-title">
            {{ store.result ? 'Hasil Identifikasi' : 'Analisis Baru' }}
          </h1>
          <p class="workspace-desc">
            {{ store.result
              ? 'Rincian analitik prediksi kualitas air berdasarkan model.'
              : 'Lengkapi parameter data untuk menjalankan prediksi kualitas air yang presisi.'
            }}
          </p>
        </div>
        <div class="workspace-header__actions">
          <template v-if="!store.result">
            <button class="btn btn--secondary" :disabled="loading" @click="handleReset">
              Batal
            </button>
            <button class="btn btn--primary btn-process" :disabled="loading" @click="handleSubmit">
              <Loader2 v-if="loading" class="spin" size="16" />
              <Activity v-else size="16" />
              {{ loading ? 'Menganalisis...' : 'Jalankan Analisis' }}
            </button>
          </template>
          <template v-else>
            <router-link to="/dashboard" class="btn btn--secondary">
              Ke Dashboard
            </router-link>
            <button class="btn btn--primary" @click="handleNewAnalysis">
              <Plus size="16" />
              Analisis Baru
            </button>
          </template>
        </div>
      </header>

      <div class="workspace-content">
        <!-- Error Banner -->
        <div v-if="submitError" class="alert alert--danger error-banner">
          <AlertTriangle size="16" />
          <span>{{ submitError }}</span>
        </div>

        <transition name="fade-slide" mode="out-in">

          <!-- Form State: Upload + Manual Form -->
          <div v-if="!store.result" class="analysis-grid" key="form">
            <div class="col-upload">
              <UploadCard />
            </div>
            <div class="col-form">
              <ManualDataForm />
            </div>
          </div>

          <!-- Result State: Full width, no artificial cap -->
          <div v-else class="result-container" key="result">
            <PredictionResult :result="store.result" />
          </div>

        </transition>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import UploadCard from '@/components/analysis/UploadCard.vue'
import ManualDataForm from '@/components/analysis/ManualDataForm.vue'
import PredictionResult from '@/components/analysis/PredictionResult.vue'
import { useAnalysisStore } from '@/stores/analysisStore'
import { useAnalysis } from '@/composables/useAnalysis'
import { AlertTriangle, Loader2, Activity, Plus } from 'lucide-vue-next'

const store = useAnalysisStore()
const { loading, error: submitError, submit } = useAnalysis()

async function handleSubmit() {
  await submit()
}

function handleReset() {
  store.reset()
}

function handleNewAnalysis() {
  store.reset()
}
</script>

<style scoped>
/* ─────────────────────────────────────────────
   Page Shell
───────────────────────────────────────────── */
.analysis-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* ─────────────────────────────────────────────
   Workspace Header
───────────────────────────────────────────── */
.workspace-header {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-border-light);
}

@media (min-width: 640px) {
  .workspace-header {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  }
}

.workspace-header__main {
  flex: 1;
  min-width: 0;
}

.workspace-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 4px;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.workspace-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.5;
}

.workspace-header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.btn-process {
  min-width: 152px;
  box-shadow: 0 4px 12px color-mix(in srgb, var(--color-primary) 25%, transparent);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.btn-process:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px color-mix(in srgb, var(--color-primary) 35%, transparent);
}

/* ─────────────────────────────────────────────
   Workspace Content
───────────────────────────────────────────── */
.workspace-content {
  flex: 1;
}

.error-banner {
  margin-bottom: 18px;
}

/* ─────────────────────────────────────────────
   Analysis Grid — Form State
   FIX: Proportional fr units instead of fixed px.
   5fr/7fr ≈ 42% upload / 58% form — balanced at all widths.
───────────────────────────────────────────── */
.analysis-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: start;
}

/* Tablet: equal split so neither side is too narrow */
@media (min-width: 768px) {
  .analysis-grid {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
}

/* Desktop: proportional — upload gets slightly less than form */
@media (min-width: 1024px) {
  .analysis-grid {
    grid-template-columns: 5fr 7fr;
    gap: 24px;
  }
}

.col-upload {
  /* Sticky so it stays visible while scrolling a long form */
  position: sticky;
  top: 24px;
}

.col-form {
  /* Prevent text/inputs from escaping their column */
  min-width: 0;
}

/* ─────────────────────────────────────────────
   Result Container — Result State
   FIX: Remove max-width: 800px — let PredictionResult
   use the full available width.
───────────────────────────────────────────── */
.result-container {
  width: 100%;
}

/* ─────────────────────────────────────────────
   Animations
───────────────────────────────────────────── */
.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>