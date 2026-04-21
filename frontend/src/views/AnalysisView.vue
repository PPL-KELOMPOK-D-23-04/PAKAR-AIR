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
    <div class="header">
      <h1>Analisis Baru</h1>
      <p>Upload foto air dan lengkapi informasi untuk analisis</p>
    </div>

    <div class="grid">
      <div class="card">
        <h2>Upload Foto Air</h2>
        <ImageUploader />
      </div>

      <div class="card">
        <h2>Informasi Air</h2>
        <ManualDataForm />
      </div>
    </div>

    <div class="action">
      <button 
        @click="handleSubmit"
        :disabled="!store.image || loading"
      >
        {{ loading ? 'Memproses...' : 'Proses Analisis' }}
      </button>
    </div>

    <PredictionResult v-if="store.result" :result="store.result" />
  </div>
</template>

<style scoped>
.analysis-page {
  padding: 24px;
  max-width: 1100px;
  margin: auto;
}

/* HEADER */
.header h1 {
  font-size: 28px;
  font-weight: 700;
}

.header p {
  color: #6b7280;
  margin-bottom: 20px;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* CARD */
.card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

/* BUTTON */
.action {
  margin-top: 20px;
}

button {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: #2563eb;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: #1d4ed8;
}

button:disabled {
  background: #9ca3af;
}
</style>