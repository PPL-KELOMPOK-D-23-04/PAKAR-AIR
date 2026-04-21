<script setup>
import { ref } from 'vue'
import ImageUploader from '@/components/analysis/ImageUploader.vue'
import ManualDataForm from '@/components/analysis/ManualDataForm.vue'
import PredictionResult from '@/components/analysis/PredictionResult.vue'
import { useAnalysisStore } from '@/stores/analysisStore'

const store = useAnalysisStore()
const loading = ref(false)

const handleSubmit = () => {
  if (!store.image) return
  if (Object.keys(store.manualData).length === 0) return

  loading.value = true

  setTimeout(() => {
    console.log(store.image, store.manualData)
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="analysis-page">
    <h1 class="title">Analisis Baru</h1>
    <p class="subtitle">Upload foto air dan lengkapi informasi untuk analisis</p>

    <div class="card upload-card">
      <h2>Upload Foto Air</h2>
      <ImageUploader />
    </div>

    <div class="card form-card">
      <h2>Informasi Air</h2>
      <ManualDataForm />
    </div>

    <button 
      class="analyze-btn"
      @click="handleSubmit"
      :disabled="!store.image || loading"
    >
      {{ loading ? 'Memproses...' : 'Proses Analisis' }}
    </button>

    <PredictionResult v-if="store.result" :result="store.result" />
  </div>
</template>

<style scoped>
.analysis-page {
  padding: 24px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 20px;
}

/* CARD */
.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

/* BUTTON */
.analyze-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background: #3b82f6;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.analyze-btn:hover {
  background: #2563eb;
}

.analyze-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
</style>