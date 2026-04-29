<template>
  <DashboardLayout>
    <div class="analysis-view">

      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-header__title">
          {{ store.result ? 'Hasil Identifikasi' : 'Analisis Baru' }}
        </h1>
        <p class="page-header__desc">
          {{ store.result 
            ? 'Berikut adalah hasil analisis kualitas sampel air Anda.' 
            : 'Upload foto air dan lengkapi parameter kimia untuk analisis kualitas air.' 
          }}
        </p>
      </div>

      <template v-if="!store.result">
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
      </template>

      <!-- Result View -->
      <template v-else>
        <PredictionResult :result="store.result" />

        <div class="action-bar">
          <button class="btn btn--primary" @click="handleNewAnalysis">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Analisis Baru
          </button>
          <router-link to="/dashboard" class="btn btn--secondary">
            Kembali ke Dashboard
          </router-link>
        </div>
      </template>

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

<style scoped src="@/assets/styles/pages/analysis.css"></style>