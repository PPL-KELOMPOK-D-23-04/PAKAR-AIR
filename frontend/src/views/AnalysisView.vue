<template>
  <DashboardLayout>

    <div class="analysis-view">

      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-header__title">Analisis Baru</h1>
        <p class="page-header__desc">
          Upload foto air dan lengkapi parameter kimia untuk analisis kualitas air.
        </p>
      </div>

      <!-- Upload Section -->
      <UploadCard />

      <!-- Manual Input Section -->
      <ManualDataForm />

      <!-- Error Banner -->
      <div v-if="submitError" class="error-banner" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        {{ submitError }}
      </div>

      <!-- Action Buttons -->
      <div class="action-bar">
        <button
          class="btn btn--primary"
          :disabled="loading"
          @click="handleSubmit"
        >
          <svg v-if="loading" class="btn__spin"
            xmlns="http://www.w3.org/2000/svg" width="15" height="15"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581
                 m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2
                 M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
          </svg>
          {{ loading ? 'Memproses Analisis...' : 'Proses Analisis' }}
        </button>

        <button class="btn btn--secondary" :disabled="loading" @click="handleReset">
          Batal
        </button>
      </div>

      <!-- Result (conditional — only shown after API returns) -->
      <PredictionResult v-if="store.result" :result="store.result" />

    </div>

  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '../layouts/DashboardLayout.vue'
import UploadCard from '../components/analysis/UploadCard.vue'
import ManualDataForm from '../components/analysis/ManualDataForm.vue'
import PredictionResult from '../components/analysis/PredictionResult.vue'
import { useAnalysisStore } from '../stores/analysisStore'
import { useAnalysis } from '../composables/useAnalysis'

const store = useAnalysisStore()
const { loading, error: submitError, submit } = useAnalysis()

async function handleSubmit() {
  await submit()
}

function handleReset() {
  store.reset()
}
</script>

<style scoped>
.analysis-view {
  max-width: null;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Page Header */
.page-header {
  margin-bottom: 4px;
}

.page-header__title {
  font-size: 22px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 4px;
}

.page-header__desc {
  font-size: 13px;
  color: #94a3b8;
}

/* Error Banner */
.error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 13px;
  color: #991b1b;
}

/* Action Bar */
.action-bar {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 10px 22px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, opacity 0.15s, box-shadow 0.15s;
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.btn--primary {
  flex: 1;
  background: #1e40af;
  color: #ffffff;
  border-color: #1e40af;
}

.btn--primary:not(:disabled):hover {
  background: #1d3a9e;
  box-shadow: 0 2px 6px rgba(30, 64, 175, 0.3);
}

.btn--secondary {
  background: #ffffff;
  color: #374151;
  border-color: #d1d5db;
  min-width: 110px;
}

.btn--secondary:not(:disabled):hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

/* Spinner animation */
.btn__spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
</style>