<template>
    <div class="analysis-view">

      <!-- Page Header -->
      <div class="analysis-view__header">
        <h1 class="analysis-view__title">Analisis Baru</h1>
        <p class="analysis-view__desc">
          Upload foto air dan lengkapi informasi untuk analisis kualitas air.
        </p>
      </div>

      <!-- Body -->
      <div class="analysis-view__body">

        <!-- Upload Section -->
        <UploadCard />

        <!-- Manual Input Section -->
        <ManualDataForm />

        <!-- Validation Error -->
        <p v-if="submitError" class="analysis-view__error">{{ submitError }}</p>

        <!-- Action Buttons -->
        <div class="analysis-view__actions">
          <button
            class="btn btn--primary"
            :disabled="loading"
            @click="handleSubmit"
          >
            <svg v-if="loading" class="btn__spinner"
              xmlns="http://www.w3.org/2000/svg" width="16" height="16"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"/>
            </svg>
            {{ loading ? 'Memproses...' : 'Proses Analisis' }}
          </button>
          <button class="btn btn--secondary" :disabled="loading" @click="handleReset">
            Batal
          </button>
        </div>

        <!-- Result (conditional) -->
        <PredictionResult v-if="store.result" :result="store.result" />

      </div>
    </div>
    
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
  width: 100%;
  max-width: none;
}
.analysis-view__header {
  margin-bottom: 24px;
}
.analysis-view__title {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 6px;
}
.analysis-view__desc {
  font-size: 13px;
  color: #888;
  margin: 0;
}
.analysis-view__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.analysis-view__error {
  font-size: 13px;
  color: #444;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 14px;
  margin: 0;
}
.analysis-view__actions {
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.15s, border-color 0.15s, opacity 0.15s;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn--primary {
  flex: 1;
  background: #555;
  color: #fff;
  border-color: #555;
}
.btn--primary:not(:disabled):hover {
  background: #333;
  border-color: #333;
}
.btn--secondary {
  background: #fff;
  color: #333;
  border-color: #ccc;
  min-width: 120px;
}
.btn--secondary:not(:disabled):hover {
  background: #f5f5f5;
}
.btn__spinner {
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
</style>